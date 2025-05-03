#pragma once
#include "../db/Database.h"
#include "../serializers/ChatSerializer.h"
#include "crow.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

class ChatController {
    Database &db;

public:
    explicit ChatController(Database &db) : db(db) {
    };

    [[nodiscard]] crow::response getAllChats(const int userID) const {
        const auto chats = db.getAllChats(userID);
        return crow::response{200, ChatSerializer::serializeChats(chats)};
    }

    [[nodiscard]] crow::response getChatById(const int id) const {
        const auto chat = db.getChatById(id);
        if (!chat) {
            return crow::response{404, "Chat not found"};
        }
        return crow::response{200, ChatSerializer::serializeOptionalChat(chat).dump()};
    }

    crow::response createChat(crow::request &req) const {
        json j;
        try {
            j = json::parse(req.body);
        } catch (const std::exception &e) {
            return crow::response{400, R"({"error": "Invalid JSON"})"};
        }

        const Chat chat = ChatSerializer::deserializeChat(j);
        db.insertChat(chat);
        return crow::response{201};
    }
};
