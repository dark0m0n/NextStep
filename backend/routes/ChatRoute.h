#pragma once
#include "../controllers/ChatController.h"
#include "crow.h"

template <typename App>
class ChatRoute {
public:
    static void registerRoutes(crow::App &app, Database &db) {
        ChatController controller(db);

        CROW_ROUTE(app, "/api/chats/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int userID) {
            return controller.getAllChats(userID);
        });

        CROW_ROUTE(app, "/api/chat/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int id) {
            return controller.getChatById(id);
        });

        CROW_ROUTE(app, "/api/chat").methods(crow::HTTPMethod::Post)
        ([&controller](crow::request req) {
            return controller.createChat(req);
        });
    }
};
