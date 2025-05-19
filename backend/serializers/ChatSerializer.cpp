#include "ChatSerializer.h"

json ChatSerializer::serializeChat(const Chat &chat) {
    return {
        {"id", chat.getId()},
        {"isGroup", chat.getIsGroup()},
        {"title", chat.getTitle()}
    };
}

json ChatSerializer::serializeChats(const std::vector<Chat> &chats) {
    json j;
    for (const auto &chat: chats) {
        j.push_back(serializeChat(chat));
    }
    return j;
}

json ChatSerializer::serializeOptionalChat(const std::optional<Chat> &chat) {
    if (chat.has_value()) {
        return serializeChat(chat.value());
    }
    return nullptr;
}

Chat ChatSerializer::deserializeChat(const json &j) {
    return Chat{
        j.at("id").get<int>(),
        j.at("isGroup").get<bool>(),
        j.at("title").get<std::string>()
    };
}
