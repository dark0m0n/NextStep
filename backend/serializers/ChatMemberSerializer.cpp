#include "ChatMemberSerializer.h"
#include <Database.h>
#include "UserSerializer.h"

json ChatMemberSerializer::serializeChatMember(const ChatMember &chatMember) {
    return {
        {"id", chatMember.getID()},
        {"chatID", chatMember.getChatID()},
        {"user", UserSerializer::serializeOptionalUser(Database::getUserById(chatMember.getUserID()))}
    };
}

json ChatMemberSerializer::serializeChatMembers(const std::vector<ChatMember> &chatMembers) {
    json j;
    for (const auto &chatMember: chatMembers) {
        j.push_back(serializeChatMember(chatMember));
    }
    return j;
}

json ChatMemberSerializer::serializeOptionalChatMember(const std::optional<ChatMember> &chatMember) {
    if (chatMember.has_value()) {
        return serializeChatMember(chatMember.value());
    }
    return nullptr;
}

ChatMember ChatMemberSerializer::deserializeChatMember(const json &j) {
    return ChatMember{
        j.at("id").get<int>(),
        j.at("chatID").get<int>(),
        j.at("userID").get<int>()
    };
}
