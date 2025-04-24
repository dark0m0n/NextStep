#pragma once
#include <exception>
#include <string>
#include <utility>

class DbConnectionError final : public std::exception {
    std::string msg;

public:
    explicit DbConnectionError(std::string msg)
        : msg(std::move(msg)) {
    }

    [[nodiscard]] const char *what() const noexcept override {
        return msg.c_str();
    }
};
