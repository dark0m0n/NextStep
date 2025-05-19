#pragma once

class ChatMember {
    int id, chatID, userID;

public:
    ChatMember(int id, int chatID, int userID);

    ~ChatMember() = default;

    [[nodiscard]] int getID() const;

    [[nodiscard]] int getChatID() const;

    [[nodiscard]] int getUserID() const;
};
