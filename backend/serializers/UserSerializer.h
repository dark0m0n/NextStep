#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/User.h"

using json = nlohmann::json;

class UserSerializer {
public:
    static json serializeUser(const User &user);

    static json serializeUsers(const std::vector<User> &users);

    static json serializeOptionalUser(const std::optional<User> &user);

    static User deserializeUser(const json &j);
};
