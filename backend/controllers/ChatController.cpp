#include "ChatController.h"
#include "../serializers/ChatSerializer.h"
#include "../utils/FormData.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

ChatController::ChatController(Database &db) : db(db) {
};

crow::response ChatController::getAllChats(const int userID) const {
    const auto chats = db.getAllChats(userID);
    return crow::response{200, ChatSerializer::serializeChats(chats).dump()};
}

crow::response ChatController::getChatById(const int id) const {
    const auto chat = db.getChatById(id);
    if (!chat) {
        return crow::response{404, "Chat not found"};
    }
    return crow::response{200, ChatSerializer::serializeOptionalChat(chat).dump()};
}

crow::response ChatController::createChat(const crow::request &req) {
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

        const int id = Database::insertChat(chat);

        const ChatMember member1 {
            0,
            id,
            std::stoi(form["member1"])
        };

        const ChatMember member2 {
            0,
            id,
            std::stoi(form["member2"])
        };

        Database::insertChatMember(member1);
        Database::insertChatMember(member2);

        return crow::response{201};
    }

    return crow::response{400, "Unsupported content type"};
}
