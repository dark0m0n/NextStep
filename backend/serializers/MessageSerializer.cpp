#include "MessageSerializer.h"

json MessageSerializer::serializeMessage(const Message &message) {
    return {
        {"id", message.getID()},
        {"chatID", message.getChatID()},
        {"senderID", message.getSenderID()},
        {"text", message.getText()}
    };
}

json MessageSerializer::serializeMessages(const std::vector<Message> &messages) {
    json j;
    for (const auto &message: messages) {
        j.push_back(serializeMessage(message));
    }
    return j;
}

json MessageSerializer::serializeOptionalMessage(const std::optional<Message> &message) {
    if (message.has_value()) {
        return serializeMessage(message.value());
    }
    return nullptr;
}

Message MessageSerializer::deserializeMessage(const json &j) {
    return Message{
        j.at("id").get<int>(),
        j.at("chatID").get<int>(),
        j.at("senderID").get<int>(),
        j.at("text").get<std::string>()
    };
}
