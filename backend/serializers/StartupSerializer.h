#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Startup.h"

using json = nlohmann::json;

class StartupSerializer {
public:
    static json serializeStartup(const Startup &startup);

    static json serializeStartups(const std::vector<Startup> &startups);

    static json serializeOptionalStartup(const std::optional<Startup> &startup);

    static Startup deserializeStartup(const json &j);
};
