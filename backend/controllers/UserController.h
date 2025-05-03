#pragma once
#include "../db/Database.h"
#include "../serializers/UserSerializer.h"
#include "crow.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

class UserController {
    Database &db;

public:
    explicit UserController(Database &db) : db(db) {
    }

    [[nodiscard]] crow::response getAllUsers() const {
        const auto users = db.getAllUsers();
        return crow::response{200, UserSerializer::serializeUsers(users).dump()};
    }

    [[nodiscard]] crow::response getUserById(const int id) const {
        const auto user = db.getUserById(id);
        if (!user) {
            return crow::response{404, R"({"error": "User not found"})"};
        }
        return crow::response{200, UserSerializer::serializeOptionalUser(user).dump()};
    }

    crow::response createUser(crow::request &req) const {
        json j;
        try {
            j = json::parse(req.body);
        } catch (const std::exception &e) {
            return crow::response{400, R"({"error": "Invalid JSON"})"};
        }

        const User user = UserSerializer::deserializeUser(j);
        db.insertUser(user);
        return crow::response{201};
    }
};
