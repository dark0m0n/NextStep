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

    static std::optional<jwt::decoded_jwt<jwt::traits::kazuho_picojson>> decodeToken(const std::string &token) {
        try {
            auto decoded = jwt::decode(token);
            const auto verifier = jwt::verify()
                .allow_algorithm(jwt::algorithm::hs256(std::getenv("HMAC_KEY")))
                .with_issuer("nextstep");

            verifier.verify(decoded);
            return decoded;
        } catch (const std::exception &e) {
            std::cerr << "JWT error: " << e.what() << std::endl;
            return std::nullopt;
        }
    }
};
