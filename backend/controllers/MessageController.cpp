#include "MessageController.h"
#include "../serializers/MessageSerializer.h"
#include "../utils/FormData.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

MessageController::MessageController(Database &db) : db(db) {
}

crow::response MessageController::getAllMessages(const int chatID) const {
    const auto messages = db.getAllMessages(chatID);
    return crow::response{200, MessageSerializer::serializeMessages(messages)};
}

crow::response MessageController::getMessageById(const int id) const {
    const auto messages = db.getMessageById(id);
    if (!messages) {
        return crow::response{404, "Message not found"};
    }
    return crow::response{200, MessageSerializer::serializeOptionalMessage(messages).dump()};
}

crow::response MessageController::createMessage(const crow::request &req) const {
    std::string contentType = req.get_header_value("Content-Type");

    if (contentType.find("multipart/form-data") != std::string::npos) {
        const size_t boundaryPos = contentType.find("boundary=");
        if (boundaryPos == std::string::npos) {
            return crow::response{400, "No boundary in Content-Type"};
        }
        const std::string boundary = contentType.substr(boundaryPos + 9);

        auto form = FormData::parse(req.body, boundary);

        const Message message{
            0,
            std::stoi(form["chatID"]),
            std::stoi(form["senderID"]),
            form["text"],
        };

        db.insertMessage(message);
        return crow::response{201};
    }

    return crow::response{400, "Unsupported content type"};
}
