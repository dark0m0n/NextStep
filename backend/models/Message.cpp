#include "Message.h"
#include <utility>

Message::Message(const int id, const int chatID, const int senderID, std::string text)
    : id(id), chatID(chatID), senderID(senderID), text(std::move(text)) {
}

int Message::getID() const { return id; }

int Message::getChatID() const { return chatID; }

int Message::getSenderID() const { return senderID; }

std::string Message::getText() const { return text; }
