#pragma once
#include "../controllers/StartupController.h"
#include "crow.h"

template <typename App>
class StartupRoute {
public:
    static void registerRoutes(App &app, Database &db) {
        StartupController controller(db);

        CROW_ROUTE(app, "/api/startups").methods(crow::HTTPMethod::Get)
        ([]() {
            return StartupController::getAllStartups();
        });

        CROW_ROUTE(app, "/api/startup/<int>").methods(crow::HTTPMethod::Get)
        ([](const int id) {
            return StartupController::getStartupById(id);
        });

        CROW_ROUTE(app, "/api/startup").methods(crow::HTTPMethod::Post)
        ([](const crow::request &req) {
            return StartupController::createStartup(req);
        });

        CROW_ROUTE(app, "/api/startup").methods(crow::HTTPMethod::Delete)
        ([&controller, &app](const crow::request &req) {
            return controller.deleteStartup(app, req);
        });

        CROW_ROUTE(app, "/api/startup").methods(crow::HTTPMethod::Put)
        ([&controller, &app](const crow::request &req) {
            return controller.updateStartup(app, req);
        });
    }
};
