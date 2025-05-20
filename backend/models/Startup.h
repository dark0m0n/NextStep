#pragma once
#include <string>

class Startup {
    int id, userID, investment, averageRating;
    std::string title, description, imagePath, experience, category, projectType;

public:
    Startup(int id, int userID, std::string title, std::string description, std::string imagePath,
            std::string experience, std::string category, std::string projectType, int investment, int averageRating);

    ~Startup() = default;

    [[nodiscard]] int getID() const;

    [[nodiscard]] int getUserID() const;

    [[nodiscard]] std::string getTitle() const;

    [[nodiscard]] std::string getDescription() const;

    [[nodiscard]] std::string getImagePath() const;

    [[nodiscard]] std::string getExperience() const;

    [[nodiscard]] std::string getCategory() const;

    [[nodiscard]] std::string getProjectType() const;

    [[nodiscard]] int getInvestment() const;

    [[nodiscard]] int getAverageRating() const;
};
