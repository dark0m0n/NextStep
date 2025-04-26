#pragma once
#include <string>
#include <utility>

class Chat {
	int id;
    bool isGroup;
    std::string title;

public:
	Chat(const int id, const bool isGroup, std::string title) : id(id), isGroup(isGroup), title(std::move(title)) {}

	~Chat() = default;

	[[nodiscard]] int getId() const { return id; }
	[[nodiscard]] bool getIsGroup() const { return isGroup; }
	[[nodiscard]] std::string getTitle() const { return title; }
};
