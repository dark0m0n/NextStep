#pragma once
#include "../db/Database.h"
#include "../serializers/UserSerializer.h"
#include "../utils/FormData.h"
#include "../utils/Hash.h"
#include "crow.h"
#include "nlohmann/json.hpp"
#include <string>

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

    [[nodiscard]] crow::response createUser(const crow::request &req) const {
        std::string contentType = req.get_header_value("Content-Type");

        if (contentType.find("multipart/form-data") != std::string::npos) {
            const size_t boundaryPos = contentType.find("boundary=");
            if (boundaryPos == std::string::npos) {
                return crow::response{400, "No boundary in Content-Type"};
            }
            const std::string boundary = contentType.substr(boundaryPos + 9);

            auto form = FormData::parse(req.body, boundary);

            form["password"] = Hash::hash(form["password"].c_str());

            const User user{
                0,
                form["username"],
                form["firstname"],
                form["lastname"],
                form["email"],
                form["password"],
                form["phoneNumber"],
                form["imagePath"],
                form["country"],
                form["language"],
                form["specialities"],
                form["skills"],
                form["additionalInfo"]
            };

            db.insertUser(user);
            return crow::response{201};
        }

        return crow::response{400, "Unsupported content type"};
    }
};
