#pragma once
#include "../db/Database.h"
#include "crow.h"
#include "../middleware/AuthMiddleware.h"
#include "../serializers/UserSerializer.h"

class UserController {
    Database &db;

public:
    explicit UserController(Database &db);

    [[nodiscard]] crow::response getAllUsers() const;

    [[nodiscard]] crow::response getUserById(int id) const;

    [[nodiscard]] crow::response getUserByUsername(const std::string &username) const;

    [[nodiscard]] crow::response createUser(const crow::request &req) const;

    [[nodiscard]] crow::response login(const crow::request &req) const;

    template <typename App>
    [[nodiscard]] crow::response getMe(App &app, const crow::request &req) const {
        auto &ctx = app.template get_context<AuthMiddleware>(req);

        if (!ctx.auth.authorized) {
            return crow::response{401, "Unauthorized"};
        }

        auto user = db.getUserByUsername(ctx.auth.username);

        return crow::response{UserSerializer::serializeOptionalUser(user).dump()};
    }

};
