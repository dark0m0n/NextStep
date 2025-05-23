#pragma once
#include "../controllers/UserController.h"
#include "../middleware/AuthMiddleware.h"
#include "crow.h"

template <typename App>
class UserRoute {
public:
    static void registerRoutes(App &app, Database &db) {
        UserController controller(db);

        CROW_ROUTE(app, "/api/users").methods(crow::HTTPMethod::Get)
        ([&controller]() {
            return controller.getAllUsers();
        });

        CROW_ROUTE(app, "/api/user/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int id) {
            return controller.getUserById(id);
        });

        CROW_ROUTE(app, "/api/user/<string>").methods(crow::HTTPMethod::Get)
        ([&controller](const std::string &username) {
            return controller.getUserByUsername(username);
        });

        CROW_ROUTE(app, "/api/user").methods(crow::HTTPMethod::Post)
        ([&controller](const crow::request &req) {
            return controller.createUser(req);
        });

        CROW_ROUTE(app, "/api/login").methods(crow::HTTPMethod::Post)
        ([&controller](const crow::request &req) {
            return controller.login(req);
        });

        CROW_ROUTE(app, "/api/me").methods(crow::HTTPMethod::Get)
        ([&controller, &app](const crow::request &req) {
            return controller.getMe(app, req);
        });
    }
};
