#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Message.h"

using json = nlohmann::json;

class MessageSerializer {
public:
    static json serializeMessage(const Message &message);

    static json serializeMessages(const std::vector<Message> &messages);

    static json serializeOptionalMessage(const std::optional<Message> &message);

    static Message deserializeMessage(const json &j);
};
