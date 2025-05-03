#pragma once
#include "../db/Database.h"
#include "../serializers/MessageSerializer.h"
#include "crow.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

class MessageController {
    Database &db;

public:
    explicit MessageController(Database &db) : db(db) {
    }

    [[nodiscard]] crow::response getAllMessages(const int chatID) const {
        const auto messages = db.getAllMessages(chatID);
        return crow::response{200, MessageSerializer::serializeMessages(messages)};
    }

    [[nodiscard]] crow::response getMessageById(const int id) const {
        const auto messages = db.getMessageById(id);
        if (!messages) {
            return crow::response{404, "Message not found"};
        }
        return crow::response{200, MessageSerializer::serializeOptionalMessage(messages).dump()};
    }

    crow::response createMessage(crow::request &req) const {
        json j;
        try {
            j = json::parse(req.body);
        } catch (const std::exception &e) {
            return {400, R"({"error": "Invalid JSON"})"};
        }

        const Message message = MessageSerializer::deserializeMessage(j);
        db.insertMessage(message);
        return crow::response{201};
    }
};
