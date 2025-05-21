#include "StartupSerializer.h"

json StartupSerializer::serializeStartup(const Startup &startup) {
    return {
        {"id", startup.getID()},
        {"userID", startup.getUserID()},
        {"title", startup.getTitle()},
        {"description", startup.getDescription()},
        {"imagePath", startup.getImagePath()},
        {"experience", startup.getExperience()},
        {"category", startup.getCategory()},
        {"projectType", startup.getProjectType()},
        {"investment", startup.getInvestment()},
        {"averageRating", startup.getAverageRating()},
        {"hiring", startup.getHiring()}
    };
}

json StartupSerializer::serializeStartups(const std::vector<Startup> &startups) {
    json j = json::array();
    for (const auto &startup: startups) {
        j.push_back(serializeStartup(startup));
    }
    return j;
}

json StartupSerializer::serializeOptionalStartup(const std::optional<Startup> &startup) {
    if (startup.has_value()) {
        return serializeStartup(startup.value());
    }
    return nullptr;
}

Startup StartupSerializer::deserializeStartup(const json &j) {
    return Startup{
        0,
        j.at("userID").get<int>(),
        j.at("title").get<std::string>(),
        j.at("description").get<std::string>(),
        j.at("imagePath").get<std::string>(),
        j.at("experience").get<std::string>(),
        j.at("category").get<std::string>(),
        j.at("projectType").get<std::string>(),
        j.at("investment").get<int>(),
        j.at("averageRating").get<int>(),
        j.at("hiring").get<bool>()
    };
}
