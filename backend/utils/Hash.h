#pragma once
#include <string>

class Hash {
public:
    static std::string hash(const char *password);

    static bool equal(const std::string &hash, const std::string &password);
};
