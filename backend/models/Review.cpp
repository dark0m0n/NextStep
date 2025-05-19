#include "Review.h"
#include <utility>

Review::Review(const int id, const int userID, const int startupID, std::string text, const int rating)
    : id(id), userID(userID), startupID(startupID), text(std::move(text)), rating(rating) {
}

int Review::getId() const { return id; }

int Review::getUserID() const { return userID; }

int Review::getStartupID() const { return startupID; }

std::string Review::getText() const { return text; }

int Review::getRating() const { return rating; }
