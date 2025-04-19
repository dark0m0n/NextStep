#pragma once
#include <string>

class Review
{
private:
    int id;
    int userID;
    int startupID;
    std::string text;
    int rating;

public:
    Review(int id, int userID, int startupID, std::string text, int rating)
        : id(id), userID(userID), startupID(startupID), text(text), rating(rating) {}
    ~Review() {}
};
