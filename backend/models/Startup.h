#pragma once
#include <string>

class Startup
{
private:
    int id;
    int userID;
    std::string title;
    std::string description;
    std::string imagePath;

public:
    Startup(int id, int userID, std::string title, std::string description, std::string imagePath)
        : id(id), userID(userID), title(title), description(description), imagePath(imagePath) {}
    ~Startup() {}
};
