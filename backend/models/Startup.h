#pragma once
#include <string>
#include <utility>

class Startup {
    int id;
    int userID;
    std::string title;
    std::string description;
    std::string imagePath;

public:
    Startup(const int id, const int userID, std::string title, std::string description, std::string imagePath)
        : id(id), userID(userID), title(std::move(title)), description(std::move(description)),
          imagePath(std::move(imagePath)) {
    }

    ~Startup() = default;

    [[nodiscard]] int getID() const { return id; }
    [[nodiscard]] int getUserID() const { return userID; }
    [[nodiscard]] std::string getTitle() const { return title; }
    [[nodiscard]] std::string getDescription() const { return description; }
    [[nodiscard]] std::string getImagePath() const { return imagePath; }
};
