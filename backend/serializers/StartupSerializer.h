#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Startup.h"

using json = nlohmann::json;

class StartupSerializer {
public:
    static json serializeStartup(const Startup &startup) {
        return {
            {"id", startup.getID()},
            {"userID", startup.getUserID()},
            {"title", startup.getTitle()},
            {"description", startup.getDescription()},
            {"imagePath", startup.getImagePath()}
        };
    }

    static json serializeStartups(const std::vector<Startup> &startups) {
        json j = json::array();
        for (const auto &startup: startups) {
            j.push_back(serializeStartup(startup));
        }
        return j;
    }

    static json serializeOptionalStartup(const std::optional<Startup> &startup) {
        if (startup.has_value()) {
            return serializeStartup(startup.value());
        }
        return nullptr;
    }
};
