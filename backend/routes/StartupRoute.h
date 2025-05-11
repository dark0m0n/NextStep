#pragma once
#include "../controllers/StartupController.h"
#include "crow.h"

template <typename App>
class StartupRoute {
public:
    static void registerRoutes(crow::App &app, Database &db) {
        StartupController controller(db);

        CROW_ROUTE(app, "/api/startups").methods(crow::HTTPMethod::Get)
        ([&controller]() {
            return controller.getAllStartups();
        });

        CROW_ROUTE(app, "/api/startup/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int id) {
            return controller.getStartupById(id);
        });

        CROW_ROUTE(app, "/api/startup").methods(crow::HTTPMethod::Post)
        ([&controller](crow::request req) {
            return controller.createStartup(req);
        });
    }
};
