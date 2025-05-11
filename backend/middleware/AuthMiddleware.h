#pragma once
#include <crow.h>
#include <optional>
#include "../auth/Token.h"

struct AuthContext {
    bool authorized = false;
    std::string username;
};

class AuthMiddleware {
public:
    struct context {
        AuthContext auth;
    };

    void beforeHandle(crow::request &req, crow::response &res, context &ctx) {
        std::string authHeader = req.get_header_value("Authorization");
        if (authHeader.empty() || authHeader.find("Bearer ") != 0) {
            res.code = 401;
            res.body = R"({"error": "Missing or invalid Authorization header"})";
            res.end();
            return;
        }

        const std::string token = authHeader.substr(7);

        auto decodedToken = Token::decodeToken(token);
        if (!decodedToken.has_value()) {
            res.code = 401;
            res.body = R"({"error": "Invalid token"})";
            res.end();
            return;
        }

        ctx.auth.authorized = true;
        ctx.auth.username = decodedToken->get_subject();
    }

    void afterHandle(crow::request &, crow::response &, context &) {}
};
