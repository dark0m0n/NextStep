#pragma once
#include <string>
#include <utility>

class Review {
    int id;
    int userID;
    int startupID;
    std::string text;
    int rating;

public:
    Review(const int id, const int userID, const int startupID, std::string text, const int rating)
        : id(id), userID(userID), startupID(startupID), text(std::move(text)), rating(rating) {
    }

    ~Review() = default;

    [[nodiscard]] int getId() const { return id; }
    [[nodiscard]] int getUserID() const { return userID; }
    [[nodiscard]] int getStartupID() const { return startupID; }
    [[nodiscard]] std::string getText() const { return text; }
    [[nodiscard]] int getRating() const { return rating; }
};
