#pragma once
#include "../db/Database.h"
#include "crow.h"

class MessageController {
    Database &db;

public:
    explicit MessageController(Database &db);

    [[nodiscard]] crow::response getAllMessages(int chatID) const;

    [[nodiscard]] crow::response getMessageById(int id) const;

    [[nodiscard]] crow::response createMessage(const crow::request &req) const;
};
