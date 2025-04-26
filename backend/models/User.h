#pragma once
#include <string>
#include <utility>

class User {
    int id;
    std::string username;
    std::string firstname;
    std::string lastname;
    std::string email;
    std::string password;
    char phoneNumber[20];
    std::string imagePath;
    std::string country;
    std::string language;
    std::string specialties;
    std::string skills;
    std::string additionalInfo;

public:
    User(const int id, std::string username, std::string firstname, std::string lastname, std::string email,
         std::string password, const char phoneNumber[20], std::string imagePath, std::string country,
         std::string language, std::string specialties, std::string skills, std::string additionalInfo)
        : id(id), username(std::move(username)), firstname(std::move(firstname)), lastname(std::move(lastname)),
          email(std::move(email)), password(std::move(password)), phoneNumber{*phoneNumber},
          imagePath(std::move(imagePath)), country(std::move(country)), language(std::move(language)),
          specialties(std::move(specialties)),
          skills(std::move(skills)), additionalInfo(std::move(additionalInfo)) {
    }

    ~User() = default;

    [[nodiscard]] int getId() const { return id; }
    [[nodiscard]] std::string getUsername() const { return username; }
    [[nodiscard]] std::string getFirstname() const { return firstname; }
    [[nodiscard]] std::string getLastname() const { return lastname; }
    [[nodiscard]] std::string getEmail() const { return email; }
    [[nodiscard]] std::string getPassword() const { return password; }
    [[nodiscard]] std::string getPhoneNumber() const { return phoneNumber; }
    [[nodiscard]] std::string getImagePath() const { return imagePath; }
    [[nodiscard]] std::string getCountry() const { return country; }
    [[nodiscard]] std::string getLanguage() const { return language; }
    [[nodiscard]] std::string getSpecialties() const { return specialties; }
    [[nodiscard]] std::string getSkills() const { return skills; }
    [[nodiscard]] std::string getAdditionalInfo() const { return additionalInfo; }

    void to_json(); // TODO
};
