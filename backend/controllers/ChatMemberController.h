#pragma once
#include "../db/Database.h"
#include "../serializers/ChatMemberSerializer.h"
#include "crow.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

class ChatMemberController {
    Database &db;

public:
    explicit ChatMemberController(Database &db) : db(db) {}

    [[nodiscard]] crow::response getAllMembers(const int chatID) const {
        const auto members = db.getAllChatMembers(chatID);
        return crow::response{200, ChatMemberSerializer::serializeChatMembers(members)};
    }

    [[nodiscard]] crow::response getChatMember(const int id) const {
        const auto member = db.getChatMemberById(id);
        if (!member) {
            return crow::response{404, "ChatMember not found"};
        }
        return crow::response{200, ChatMemberSerializer::serializeOptionalChatMember(member)};
    }

    crow::response createChatMember(crow::request &req) const {
        json j;
        try {
            j = json::parse(req.body);
        } catch (const std::exception &e) {
            return crow::response{400, R"({"error": "Invalid JSON"})"};
        }

        const ChatMember member = ChatMemberSerializer::deserializeChatMember(j);
        db.insertChatMember(member);
        return crow::response{201};
    }
};
