#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Chat.h"

using json = nlohmann::json;

class ChatSerializer {
public:
    static json serializeChat(const Chat &chat);

    static json serializeChats(const std::vector<Chat> &chats);

    static json serializeOptionalChat(const std::optional<Chat> &chat);

    static Chat deserializeChat(const json &j);
};
