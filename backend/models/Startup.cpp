#include "Startup.h"
#include <utility>

Startup::Startup(const int id, const int userID, std::string title, std::string description, std::string imagePath)
    : id(id), userID(userID), title(std::move(title)), description(std::move(description)),
      imagePath(std::move(imagePath)) {
}

int Startup::getID() const { return id; }

int Startup::getUserID() const { return userID; }

std::string Startup::getTitle() const { return title; }

std::string Startup::getDescription() const { return description; }

std::string Startup::getImagePath() const { return imagePath; }

