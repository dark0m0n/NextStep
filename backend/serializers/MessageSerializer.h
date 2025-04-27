#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Message.h"

using json = nlohmann::json;

class MessageSerializer {
public:
    static json serializeMessage(const Message &message) {
        return {
            {"id", message.getID()},
            {"chatID", message.getChatID()},
            {"senderID", message.getSenderID()},
            {"text", message.getText()}
        };
    }

    static json serializeMessages(const std::vector<Message> &messages) {
        json j;
        for (const auto &message: messages) {
            j.push_back(serializeMessage(message));
        }
        return j;
    }

    static json serializeOptionalMessage(const std::optional<Message> &message) {
        if (message.has_value()) {
            return serializeMessage(message.value());
        }
        return nullptr;
    }
};
