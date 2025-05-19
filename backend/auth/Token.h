#pragma once
#include <jwt-cpp/jwt.h>

class Token {
public:
    static std::string generateToken(const std::string &username);

    static std::optional<jwt::decoded_jwt<jwt::traits::kazuho_picojson> > decodeToken(const std::string &token);
};
