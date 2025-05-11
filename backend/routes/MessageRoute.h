#pragma once
#include "../controllers/MessageController.h"
#include "crow.h"

template <typename App>
class MessageRoute {
public:
    static void registerRoutes(App &app, Database &db) {
        MessageController controller(db);

        CROW_ROUTE(app, "/api/messages/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int chatID) {
            return controller.getAllMessages(chatID);
        });

        CROW_ROUTE(app, "/api/message/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int id) {
            return controller.getMessageById(id);
        });

        CROW_ROUTE(app, "/api/message").methods(crow::HTTPMethod::Post)
        ([&controller](crow::request req) {
            return controller.createMessage(req);
        });
    }
};
