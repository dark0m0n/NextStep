#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Chat.h"

using json = nlohmann::json;

class ChatSerializer {
public:
    static json serializeChat(const Chat &chat) {
        return {
            {"id", chat.getId()},
            {"isGroup", chat.getIsGroup()},
            {"title", chat.getTitle()}
        };
    }

    static json serializeChats(const std::vector<Chat> &chats) {
        json j;
        for (const auto &chat: chats) {
            j.push_back(serializeChat(chat));
        }
        return j;
    }

    static json serializeOptionalChat(const std::optional<Chat> &chat) {
        if (chat.has_value()) {
            return serializeChat(chat.value());
        }
        return nullptr;
    }
};
