#pragma once
#include <string>

class User {
    int id;
    std::string username, firstname, lastname, email, password, phoneNumber, imagePath, country, language, specialties,
            skills, additionalInfo;

public:
    User(int id, std::string username, std::string firstname, std::string lastname, std::string email,
         std::string password, std::string phoneNumber, std::string imagePath, std::string country,
         std::string language, std::string specialties, std::string skills, std::string additionalInfo);

    ~User() = default;

    [[nodiscard]] int getId() const;

    [[nodiscard]] std::string getUsername() const;

    [[nodiscard]] std::string getFirstname() const;

    [[nodiscard]] std::string getLastname() const;

    [[nodiscard]] std::string getEmail() const;

    [[nodiscard]] std::string getPassword() const;

    [[nodiscard]] std::string getPhoneNumber() const;

    [[nodiscard]] std::string getImagePath() const;

    [[nodiscard]] std::string getCountry() const;

    [[nodiscard]] std::string getLanguage() const;

    [[nodiscard]] std::string getSpecialties() const;

    [[nodiscard]] std::string getSkills() const;

    [[nodiscard]] std::string getAdditionalInfo() const;
};
