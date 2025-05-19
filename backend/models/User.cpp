#include "User.h"
#include <utility>

User::User(const int id, std::string username, std::string firstname, std::string lastname, std::string email,
           std::string password, std::string phoneNumber, std::string imagePath, std::string country,
           std::string language, std::string specialties, std::string skills, std::string additionalInfo)
    : id(id),
      username(std::move(username)),
      firstname(std::move(firstname)),
      lastname(std::move(lastname)),
      email(std::move(email)),
      password(std::move(password)),
      phoneNumber(std::move(phoneNumber)),
      imagePath(std::move(imagePath)),
      country(std::move(country)),
      language(std::move(language)),
      specialties(std::move(specialties)),
      skills(std::move(skills)),
      additionalInfo(std::move(additionalInfo)) {
}

int User::getId() const { return id; }

std::string User::getUsername() const { return username; }

std::string User::getFirstname() const { return firstname; }

std::string User::getLastname() const { return lastname; }

std::string User::getEmail() const { return email; }

std::string User::getPassword() const { return password; }

std::string User::getPhoneNumber() const { return phoneNumber; }

std::string User::getImagePath() const { return imagePath; }

std::string User::getCountry() const { return country; }

std::string User::getLanguage() const { return language; }

std::string User::getSpecialties() const { return specialties; }

std::string User::getSkills() const { return skills; }

std::string User::getAdditionalInfo() const { return additionalInfo; }
