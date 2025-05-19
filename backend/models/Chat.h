#pragma once
#include <string>

class Chat {
    int id;
    bool isGroup;
    std::string title;

public:
    Chat(int id, bool isGroup, std::string title);

    ~Chat() = default;

    [[nodiscard]] int getId() const;

    [[nodiscard]] bool getIsGroup() const;

    [[nodiscard]] std::string getTitle() const;
};
