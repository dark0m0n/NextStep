#pragma once
#include <string>

class User
{
private:
    int id;
    std::string username;
    std::string firstname;
    std::string lastname;
    std::string email;
    std::string password;

public:
    User(int id, std::string username, std::string firstname, std::string lastname, std::string email, std::string password)
        : id(id), username(username), firstname(firstname), lastname(lastname), email(email), password(password) {}
    ~User() {}

    int getId() const { return id; }

    void to_json(); // TODO
};
