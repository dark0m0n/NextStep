#pragma once
#include <string>

class Startup {
    int id, userID;
    std::string title, description, imagePath;

public:
    Startup(int id, int userID, std::string title, std::string description, std::string imagePath);

    ~Startup() = default;

    [[nodiscard]] int getID() const;

    [[nodiscard]] int getUserID() const;

    [[nodiscard]] std::string getTitle() const;

    [[nodiscard]] std::string getDescription() const;

    [[nodiscard]] std::string getImagePath() const;
};
