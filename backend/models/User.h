#pragma once
#include <string>
#include <utility>

class User
{
    int id;
    std::string username;
    std::string firstname;
    std::string lastname;
    std::string email;
    std::string password;

public:
    User(const int id, std::string username, std::string firstname, std::string lastname, std::string email,
            std::string password)
        : id(id), username(std::move(username)), firstname(std::move(firstname)), lastname(std::move(lastname)),
            email(std::move(email)), password(std::move(password)) {}
    ~User() = default;

    [[nodiscard]] int getId() const { return id; }

    void to_json(); // TODO
};
