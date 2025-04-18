#pragma once
#include <exception>
#include <string>

class DbConnectionError : public std::exception
{
private:
    std::string msg;

public:
    explicit DbConnectionError(const std::string &msg)
        : msg(msg) {}
    const char *what() const noexcept override
    {
        return msg.c_str();
    }
};
