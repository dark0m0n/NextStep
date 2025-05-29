#pragma once
#include "../db/Database.h"
#include "crow.h"

class ChatController {
    Database &db;

public:
    explicit ChatController(Database &db);

    [[nodiscard]] crow::response getAllChats(int userID) const;

    [[nodiscard]] crow::response getChatById(int id) const;

    [[nodiscard]] static crow::response createChat(const crow::request &req);
};
