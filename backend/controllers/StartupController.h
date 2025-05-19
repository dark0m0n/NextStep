#pragma once
#include "../db/Database.h"
#include "crow.h"

class StartupController {
    Database &db;

public:
    explicit StartupController(Database &db);

    [[nodiscard]] crow::response getAllStartups() const;

    [[nodiscard]] crow::response getStartupById(int id) const;

    [[nodiscard]] crow::response createStartup(const crow::request &req) const;
};
