#pragma once

class ChatMember {
    int id, chatID, userID;

public:
    ChatMember(const int id, const int chatID, const int userID) : id(id), chatID(chatID), userID(userID) {}

    ~ChatMember() = default;

    [[nodiscard]] int getID() const { return id; }
    [[nodiscard]] int getChatID() const { return chatID; }
    [[nodiscard]] int getUserID() const { return userID; }
};
