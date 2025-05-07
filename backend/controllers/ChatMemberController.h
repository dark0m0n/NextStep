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

    [[nodiscard]] crow::response createChatMember(const crow::request &req) const {
        std::string contentType = req.get_header_value("Content-Type");

        if (contentType.find("multipart/form-data") != std::string::npos) {
            const size_t boundaryPos = contentType.find("boundary=");
            if (boundaryPos == std::string::npos) {
                return crow::response{400, "No boundary in Content-Type"};
            }
            const std::string boundary = contentType.substr(boundaryPos + 9);

            auto form = FormData::parse(req.body, boundary);

            const ChatMember member{
                0,
                std::stoi(form["chatID"]),
                std::stoi(form["userID"])
            };

            db.insertChatMember(member);
            return crow::response{201};
        }

        return crow::response{400, "Unsupported content type"};
    }
};
