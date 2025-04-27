#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/User.h"

using json = nlohmann::json;

class UserSerializer {
public:
    static json serializeUser(const User &user) {
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
            {"additionalInfo", user.getAdditionalInfo()}
        };
    }

    static json serializeUsers(const std::vector<User> &users) {
        json j = json::array();
        for (const auto &user: users) {
            j.push_back(serializeUser(user));
        }
        return j;
    }

    static json serializeOptionalUser(const std::optional<User> &user) {
        if (user.has_value()) {
            return serializeUser(user.value());
        }
        return nullptr;
    }
};
