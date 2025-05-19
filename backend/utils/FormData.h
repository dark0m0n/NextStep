#pragma once
#include <unordered_map>
#include <string>

class FormData {
public:
    static std::unordered_map<std::string, std::string> parse(const std::string &body, const std::string &boundary);
};
