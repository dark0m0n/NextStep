#pragma once
#include <string>
#include <utility>

class Message {
    int id, chatID, senderID;
    std::string text;

public:
    Message(const int id, const int chatID, const int senderID, std::string text)
        : id(id), chatID(chatID), senderID(senderID), text(std::move(text)) {
    }

    ~Message() = default;

    [[nodiscard]] int getID() const { return id; }
    [[nodiscard]] int getChatID() const { return chatID; }
    [[nodiscard]] int getSenderID() const { return senderID; }
    [[nodiscard]] std::string getText() const { return text; }
};
