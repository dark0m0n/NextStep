#pragma once
#include "argon2.h"
#include <cstring>

class Hash {
public:
    static std::string hash(const char *password) {
        char salt[16];
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(0, 255);

        for (char &s: salt) {
            s = static_cast<char>(dis(gen));
        }

        char hash[128];
        char encoded[512];

        const int result = argon2_hash(
            2,
            1 << 16,
            1,
            password, strlen(password),
            salt, strlen(salt),
            hash, sizeof(hash),
            encoded, sizeof(encoded),
            Argon2_id,
            ARGON2_VERSION_13
        );

        if (result != ARGON2_OK) {
            std::cerr << "Argon2 error: " << argon2_error_message(result) << std::endl;
            return "";
        }

        return encoded;
    }

    static bool equal(const std::string &hash, const std::string &password) {
        const int result = argon2_verify(
            hash.c_str(),
            password.c_str(),
            password.size(),
            Argon2_id
        );

        return result == ARGON2_OK;
    }
};
