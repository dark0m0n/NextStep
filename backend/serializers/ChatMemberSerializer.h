#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/ChatMember.h"

using json = nlohmann::json;

class ChatMemberSerializer {
public:
    static json serializeChatMember(const ChatMember &chatMember) {
        return {
            {"id", chatMember.getID()},
            {"chatID", chatMember.getChatID()},
            {"userID", chatMember.getUserID()}
        };
    }

    static json serializeChatMembers(const std::vector<ChatMember> &chatMembers) {
        json j;
        for (const auto &chatMember: chatMembers) {
            j.push_back(serializeChatMember(chatMember));
        }
        return j;
    }

    static json serializeOptionalChatMember(const std::optional<ChatMember> &chatMember) {
        if (chatMember.has_value()) {
            return serializeChatMember(chatMember.value());
        }
        return nullptr;
    }

    static ChatMember deserializeChatMember(const json &j) {
        return ChatMember{
            j.at("id").get<int>(),
            j.at("chatID").get<int>(),
            j.at("userID").get<int>()
        };
    }
};
