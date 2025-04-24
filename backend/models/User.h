#pragma once
#include <string>
#include <utility>

class User {
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
          email(std::move(email)), password(std::move(password)) {
    }

    ~User() = default;

    [[nodiscard]] int getId() const { return id; }
    [[nodiscard]] std::string getUsername() const { return username; }
    [[nodiscard]] std::string getFirstname() const { return firstname; }
    [[nodiscard]] std::string getLastname() const { return lastname; }
    [[nodiscard]] std::string getEmail() const { return email; }
    [[nodiscard]] std::string getPassword() const { return password; }

    void to_json(); // TODO
};
