#include "ChatMember.h"

ChatMember::ChatMember(const int id, const int chatID, const int userID) : id(id), chatID(chatID), userID(userID) {
}

int ChatMember::getID() const { return id; }

int ChatMember::getChatID() const { return chatID; }

int ChatMember::getUserID() const { return userID; }
