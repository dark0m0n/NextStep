#pragma once
#include "../controllers/ChatMemberController.h"
#include "crow.h"

template <typename App>
class ChatMemberRoute {
public:
    static void registerRoutes(crow::App &app, Database &db) {
        ChatMemberController controller(db);

        CROW_ROUTE(app, "/api/chat/members/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int chatID) {
            return controller.getChatMember(chatID);
        });

        CROW_ROUTE(app, "/api/chat/member/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int id) {
            return controller.getChatMember(id);
        });

        CROW_ROUTE(app, "/api/chat/member").methods(crow::HTTPMethod::Post)
        ([&controller](crow::request req) {
            return controller.createChatMember(req);
        });
    }
};
