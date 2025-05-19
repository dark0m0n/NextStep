#include "Chat.h"
#include <utility>

Chat::Chat(const int id, const bool isGroup, std::string title) : id(id), isGroup(isGroup), title(std::move(title)) {
}

int Chat::getId() const { return id; }

bool Chat::getIsGroup() const { return isGroup; }

std::string Chat::getTitle() const { return title; }
