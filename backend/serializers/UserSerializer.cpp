#include "UserSerializer.h"

json UserSerializer::serializeUser(const User &user) {
    return {
        {"id", user.getId()},
        {"username", user.getUsername()},
        {"firstname", user.getFirstname()},
        {"lastname", user.getLastname()},
        {"email", user.getEmail()},
        {"phoneNumber", user.getPhoneNumber()},
        {"imagePath", user.getImagePath()},
        {"country", user.getCountry()},
        {"language", user.getLanguage()},
        {"specialties", user.getSpecialties()},
        {"skills", user.getSkills()},
        {"additionalInfo", user.getAdditionalInfo()},
        {"category", user.getCategory()},
        {"rating", user.getRating()},
        {"salary", user.getSalary()}
    };
}

json UserSerializer::serializeUsers(const std::vector<User> &users) {
    json j = json::array();
    for (const auto &user: users) {
        j.push_back(serializeUser(user));
    }
    return j;
}

json UserSerializer::serializeOptionalUser(const std::optional<User> &user) {
    if (user.has_value()) {
        return serializeUser(user.value());
    }
    return nullptr;
}

User UserSerializer::deserializeUser(const json &j) {
    return User{
        0,
        j.at("username").get<std::string>(),
        j.at("firstname").get<std::string>(),
        j.at("lastname").get<std::string>(),
        j.at("email").get<std::string>(),
        j.at("password").get<std::string>(),
        j.at("phoneNumber").get<std::string>(),
        j.at("imagePath").get<std::string>(),
        j.at("country").get<std::string>(),
        j.at("language").get<std::string>(),
        j.at("specialties").get<std::string>(),
        j.at("skills").get<std::string>(),
        j.at("additionalInfo").get<std::string>(),
        j.at("category").get<std::string>(),
        j.at("rating").get<int>(),
        j.at("salary").get<int>()
    };
}
