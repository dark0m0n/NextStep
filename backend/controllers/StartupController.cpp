#include "StartupController.h"
#include "../serializers/StartupSerializer.h"
#include "../utils/FormData.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

StartupController::StartupController(Database &db) : db(db) {
}

crow::response StartupController::getAllStartups() const {
    const auto startups = db.getAllStartups();
    return crow::response{200, StartupSerializer::serializeStartups(startups).dump()};
}

crow::response StartupController::getStartupById(const int id) const {
    const auto startup = db.getStartupById(id);
    if (!startup) {
        return crow::response{404, R"({"error": "User not found"})"};
    }
    return crow::response{200, StartupSerializer::serializeOptionalStartup(startup).dump()};
}

crow::response StartupController::createStartup(const crow::request &req) const {
    std::string contentType = req.get_header_value("Content-Type");

    if (contentType.find("multipart/form-data") != std::string::npos) {
        const size_t boundaryPos = contentType.find("boundary=");
        if (boundaryPos == std::string::npos) {
            return crow::response{400, "No boundary in Content-Type"};
        }
        const std::string boundary = contentType.substr(boundaryPos + 9);

        auto form = FormData::parse(req.body, boundary);

        const Startup startup{
            0,
            std::stoi(form["userID"]),
            form["title"],
            form["description"],
            form["imagePath"],
            form["experience"],
            form["category"],
            form["projectType"],
            std::stoi(form["investment"]),
            std::stoi(form["date"])
        };

        db.insertStartup(startup);
        return crow::response{201};
    }

    return crow::response{400, "Unsupported content type"};
}
