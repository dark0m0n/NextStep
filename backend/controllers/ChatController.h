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

    [[nodiscard]] crow::response createChat(const crow::request &req) const {
        std::string contentType = req.get_header_value("Content-Type");

        if (contentType.find("multipart/form-data") != std::string::npos) {
            const size_t boundaryPos = contentType.find("boundary=");
            if (boundaryPos == std::string::npos) {
                return crow::response{400, "No boundary in Content-Type"};
            }
            const std::string boundary = contentType.substr(boundaryPos + 9);

            auto form = FormData::parse(req.body, boundary);
            const bool isGroup = form["isGroup"] == "true";

            const Chat chat{
                0,
                isGroup,
                form["title"],
            };

            db.insertChat(chat);
            return crow::response{201};
        }

        return crow::response{400, "Unsupported content type"};
    }
};
