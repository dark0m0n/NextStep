#pragma once
#include "../db/Database.h"
#include "crow.h"
#include "../middleware/AuthMiddleware.h"
#include "../serializers/UserSerializer.h"
#include "../utils/FormData.h"

class UserController {
    Database &db;

public:
    explicit UserController(Database &db);

    [[nodiscard]] static crow::response getAllUsers();

    [[nodiscard]] crow::response getUserById(int id) const;

    [[nodiscard]] crow::response getUserByUsername(const std::string &username) const;

    [[nodiscard]] crow::response createUser(const crow::request &req) const;

    template <typename App>
    [[nodiscard]] crow::response deleteUser(App &app, const crow::request &req) const {
        std::string contentType = req.get_header_value("Content-Type");

        if (contentType.find("multipart/form-data") != std::string::npos) {
            const size_t boundaryPos = contentType.find("boundary=");
            if (boundaryPos == std::string::npos) {
                return crow::response{400, "No boundary in Content-Type"};
            }
            const std::string boundary = contentType.substr(boundaryPos + 9);

            auto form = FormData::parse(req.body, boundary);

            auto &ctx = app.template get_context<AuthMiddleware>(req);

            if (!ctx.auth.authorized) {
                return crow::response{401, "Unauthorized"};
            }

            auto user = Database::getUserByUsername(ctx.auth.username);
            if (user->getId() == std::stoi(form["id"])) {
                const std::string path = "../frontend/public" + user->getImagePath();
                std::remove(path.c_str());
                Database::deleteUser(std::stoi(form["id"]));
                return crow::response{200, "User successfully deleted"};
            }
            return crow::response{404, "Not Found"};
        }

        return crow::response{400, "Unsupported content type"};
    }

    template <typename App>
    [[nodiscard]] crow::response updateUser(App &app, const crow::request &req) const {
        std::string contentType = req.get_header_value("Content-Type");

        if (contentType.find("multipart/form-data") != std::string::npos) {
            const size_t boundaryPos = contentType.find("boundary=");
            if (boundaryPos == std::string::npos) {
                return crow::response{400, "No boundary in Content-Type"};
            }
            const std::string boundary = contentType.substr(boundaryPos + 9);

            auto form = FormData::parse(req.body, boundary);

            auto &ctx = app.template get_context<AuthMiddleware>(req);

            if (!ctx.auth.authorized) {
                return crow::response{401, "Unauthorized"};
            }

            auto user = Database::getUserByUsername(ctx.auth.username);
            if (user->getId() == std::stoi(form["id"])) {
                std::string path = "/users/" + form["username"] + ".jpg";
                std::ofstream file("../frontend/public" + path, std::ios::binary);
                file.write(form["photo"].c_str(), static_cast<std::streamsize>(form["photo"].size()));
                file.close();

                const User newUser{
                    std::stoi(form["id"]),
                    form["username"],
                    form["firstname"],
                    form["lastname"],
                    form["email"],
                    "no changes",
                    form["phoneNumber"],
                    "no changes",
                    form["country"],
                    form["language"],
                    form["specialties"],
                    form["skills"],
                    form["additionalInfo"],
                    form["category"],
                    0,
                    0
                };

                Database::updateUser(newUser);
                return crow::response{200, "User successfully updated"};
            }
            return crow::response{404, "Not Found"};
        }

        return crow::response{400, "Unsupported content type"};
    }

    [[nodiscard]] crow::response login(const crow::request &req) const;

    template <typename App>
    [[nodiscard]] crow::response getMe(App &app, const crow::request &req) const {
        auto &ctx = app.template get_context<AuthMiddleware>(req);

        if (!ctx.auth.authorized) {
            return crow::response{401, "Unauthorized"};
        }

        auto user = Database::getUserByUsername(ctx.auth.username);

        return crow::response{UserSerializer::serializeOptionalUser(user).dump()};
    }

};
