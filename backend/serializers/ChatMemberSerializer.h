#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/ChatMember.h"

using json = nlohmann::json;

class ChatMemberSerializer {
public:
    static json serializeChatMember(const ChatMember &chatMember);

    static json serializeChatMembers(const std::vector<ChatMember> &chatMembers);

    static json serializeOptionalChatMember(const std::optional<ChatMember> &chatMember);

    static ChatMember deserializeChatMember(const json &j);
};
