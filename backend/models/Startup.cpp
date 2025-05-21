#include "Startup.h"
#include <utility>

Startup::Startup(const int id, const int userID, std::string title, std::string description, std::string imagePath,
                 std::string experience, std::string category, std::string projectType, const int investment,
                 const int averageRating, const bool hiring)
    : id(id), userID(userID), title(std::move(title)), description(std::move(description)),
      imagePath(std::move(imagePath)), experience(std::move(experience)), category(std::move(category)),
      projectType(std::move(projectType)), investment(investment), averageRating(averageRating), hiring(hiring) {
}

int Startup::getID() const { return id; }

int Startup::getUserID() const { return userID; }

std::string Startup::getTitle() const { return title; }

std::string Startup::getDescription() const { return description; }

std::string Startup::getImagePath() const { return imagePath; }

std::string Startup::getExperience() const { return experience; }

std::string Startup::getCategory() const { return category; }

std::string Startup::getProjectType() const { return projectType; }

int Startup::getInvestment() const { return investment; }

int Startup::getAverageRating() const { return averageRating; }

bool Startup::getHiring() const { return hiring; }
