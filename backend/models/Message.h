#pragma once
#include <string>

class Message {
    int id, chatID, senderID;
    std::string text;

public:
    Message(int id, int chatID, int senderID, std::string text);

    ~Message() = default;

    [[nodiscard]] int getID() const;

    [[nodiscard]] int getChatID() const;

    [[nodiscard]] int getSenderID() const;

    [[nodiscard]] std::string getText() const;
};
