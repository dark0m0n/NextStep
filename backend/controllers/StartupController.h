#pragma once
#include "../db/Database.h"
#include "../serializers/StartupSerializer.h"
#include "crow.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

class StartupController {
    Database &db;

public:
    explicit StartupController(Database &db) : db(db) {
    }

    [[nodiscard]] crow::response getAllStartups() const {
        const auto startups = db.getAllStartups();
        return crow::response{200, StartupSerializer::serializeStartups(startups).dump()};
    }

    [[nodiscard]] crow::response getStartupById(const int id) const {
        const auto startup = db.getStartupById(id);
        if (!startup) {
            return crow::response{404, R"({"error": "User not found"})"};
        }
        return crow::response{200, StartupSerializer::serializeOptionalStartup(startup).dump()};
    }

    crow::response createStartup(crow::request &req) const {
        json j;
        try {
            j = json::parse(req.body);
        } catch (const std::exception &e) {
            return crow::response{400, R"({"error": "Invalid JSON"})"};
        }

        const Startup startup = StartupSerializer::deserializeStartup(j);
        db.insertStartup(startup);
        return crow::response{201};
    }
};
