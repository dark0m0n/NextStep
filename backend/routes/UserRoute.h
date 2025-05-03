#pragma once
#include "../controllers/UserController.h"
#include "crow.h"

class UserRoute {
public:
    static void registerRoutes(crow::SimpleApp &app, Database &db) {
        UserController controller(db);

        CROW_ROUTE(app, "/api/users").methods(crow::HTTPMethod::Get)
        ([&controller]() {
            return controller.getAllUsers();
        });

        CROW_ROUTE(app, "/api/user/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int id) {
            return controller.getUserById(id);
        });

        CROW_ROUTE(app, "/api/user").methods(crow::HTTPMethod::Post)
        ([&controller](const crow::request &req) {
            return controller.createUser(const_cast<crow::request &>(req));
        });
    }
};
