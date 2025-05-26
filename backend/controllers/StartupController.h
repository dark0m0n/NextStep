#pragma once
#include "../db/Database.h"
#include "../utils/FormData.h"
#include "../middleware/AuthMiddleware.h"
#include "crow.h"

class StartupController {
    Database &db;

public:
    explicit StartupController(Database &db);

    [[nodiscard]] static crow::response getAllStartups();

    [[nodiscard]] static crow::response getStartupById(int id);

    [[nodiscard]] static crow::response createStartup(const crow::request &req);

    template<typename App>
    crow::response deleteStartup(App &app, const crow::request &req) const {
        std::string contentType = req.get_header_value("Content-Type");

        if (contentType.find("multipart/form-data") != std::string::npos) {
            const size_t boundaryPos = contentType.find("boundary=");
            if (boundaryPos == std::string::npos) {
                return crow::response{400, "No boundary in Content-Type"};
            }
            const std::string boundary = contentType.substr(boundaryPos + 9);

            auto form = FormData::parse(req.body, boundary);

            auto &ctx = app.template get_context<AuthMiddleware>(req);

            if (!ctx.auth.authorized) {
                return crow::response{401, "Unauthorized"};
            }

            auto user = Database::getUserByUsername(ctx.auth.username);
            if (user->getId() == std::stoi(form["userID"])) {
                auto startup = Database::getStartupById(std::stoi(form["id"]));
                const std::string path = "../frontend/public" + startup->getImagePath();
                std::remove(path.c_str());
                Database::deleteStartup(std::stoi(form["id"]));
                return crow::response{200, "Startup successfully deleted"};
            }

            return crow::response{404, "Not Found"};
        }

        return crow::response{400, "Unsupported content type"};
    }

    template<typename App>
    crow::response updateStartup(App &app, const crow::request &req) const {
        std::string contentType = req.get_header_value("Content-Type");

        if (contentType.find("multipart/form-data") != std::string::npos) {
            const size_t boundaryPos = contentType.find("boundary=");
            if (boundaryPos == std::string::npos) {
                return crow::response{400, "No boundary in Content-Type"};
            }
            const std::string boundary = contentType.substr(boundaryPos + 9);

            auto form = FormData::parse(req.body, boundary);

            auto &ctx = app.template get_context<AuthMiddleware>(req);

            if (!ctx.auth.authorized) {
                return crow::response{401, "Unauthorized"};
            }

            auto user = Database::getUserByUsername(ctx.auth.username);
            if (user->getId() == std::stoi(form["userID"])) {
                std::string path = "/startups/" + form["id"] + ".jpg";
                std::ofstream file("../frontend/public" + path, std::ios::binary);
                file.write(form["photo"].c_str(), static_cast<std::streamsize>(form["photo"].size()));
                file.close();

                const Startup startup{
                    std::stoi(form["id"]),
                    std::stoi(form["userID"]),
                    form["title"],
                    form["description"],
                    "no changes",
                    form["experience"],
                    form["category"],
                    form["projectType"],
                    std::stoi(form["investment"]),
                    std::stoi(form["date"]),
                    form["hiring"] == "true"
                };

                Database::updateStartup(startup);

                return crow::response{200, "Startup successfully deleted"};
            }

            return crow::response{404, "Not Found"};
        }

        return crow::response{400, "Unsupported content type"};
    }
};
