#pragma once
#include <jwt-cpp/jwt.h>
#include <cstdlib>

class Token {
public:
    static std::string generateToken(const std::string &username) {
        auto token = jwt::create()
                .set_issuer("nextstep")
                .set_type("JWS")
                .set_subject(username)
                .set_issued_at(std::chrono::system_clock::now())
                .set_expires_at(std::chrono::system_clock::now() + std::chrono::hours(24))
                .sign(jwt::algorithm::hs256(std::getenv("HMAC_KEY")));

        return token;
    }
    // TODO verify
};
