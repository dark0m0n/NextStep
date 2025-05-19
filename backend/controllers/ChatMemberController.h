#pragma once
#include "../db/Database.h"
#include "crow.h"

class ChatMemberController {
    Database &db;

public:
    explicit ChatMemberController(Database &db);

    [[nodiscard]] crow::response getAllMembers(int chatID) const;

    [[nodiscard]] crow::response getChatMember(int id) const;

    [[nodiscard]] crow::response createChatMember(const crow::request &req) const;
};
