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

    template<typename Context>
    void before_handle(const crow::request &req, crow::response &res, context &ctx, Context &) {
        if (req.method == "OPTIONS"_method) return;
        if (req.url == "/api/user" && req.method == "POST"_method) return;
        if (req.url == "/api/login") return;

        const std::string cookieHeader = req.get_header_value("Cookie");

        if (!cookieHeader.empty()) {
            std::string tokenKey = "token=";
            auto tokenPos = cookieHeader.find(tokenKey);
            if (tokenPos != std::string::npos) {
                auto start = tokenPos + tokenKey.length();
                auto end = cookieHeader.find(';', start);
                auto token = cookieHeader.substr(start, end - start);

                const auto decodedToken = Token::decodeToken(token);

                if (!decodedToken.has_value()) {
                    res.code = 401;
                    res.body = "Invalid token";
                    return;
                }

                ctx.auth.authorized = true;
                ctx.auth.username = decodedToken->get_subject();
            }
        }

        if (!ctx.auth.authorized) {
            res.code = 401;
            res.end("Unauthorized");
        }
    }

    void after_handle(crow::request &, crow::response &, context &) {}
};
