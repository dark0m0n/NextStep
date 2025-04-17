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
    User();
    ~User();

    void to_json(); // TODO
};

User::User()
{
}

User::~User()
{
}
