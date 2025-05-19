#pragma once
#include "../db/Database.h"
#include "crow.h"

class UserController {
    Database &db;

public:
    explicit UserController(Database &db);

    [[nodiscard]] crow::response getAllUsers() const;

    [[nodiscard]] crow::response getUserById(int id) const;

    [[nodiscard]] crow::response createUser(const crow::request &req) const;

    [[nodiscard]] crow::response login(const crow::request &req) const;
};
