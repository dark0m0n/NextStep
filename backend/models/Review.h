#pragma once
#include <string>

class Review {
    int id, userID, startupID;
    std::string text;
    int rating;

public:
    Review(int id, int userID, int startupID, std::string text, int rating);

    ~Review() = default;

    [[nodiscard]] int getId() const;

    [[nodiscard]] int getUserID() const;

    [[nodiscard]] int getStartupID() const;

    [[nodiscard]] std::string getText() const;

    [[nodiscard]] int getRating() const;
};
