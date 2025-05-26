#include "UserController.h"
#include "../serializers/UserSerializer.h"
#include "../utils/Hash.h"
#include "../auth/Token.h"
#include "../middleware/AuthMiddleware.h"
#include <string>
#include <ostream>
#include "nlohmann/json.hpp"

using json = nlohmann::json;

UserController::UserController(Database &db) : db(db) {
}

crow::response UserController::getAllUsers() {
    const auto users = Database::getAllUsers();
    return crow::response{200, UserSerializer::serializeUsers(users).dump()};
}

crow::response UserController::getUserById(const int id) const {
    const auto user = db.getUserById(id);
    if (!user) {
        return crow::response{404, "User not found"};
    }
    return crow::response{200, UserSerializer::serializeOptionalUser(user).dump()};
}

crow::response UserController::getUserByUsername(const std::string &username) const {
    const auto user = db.getUserByUsername(username);
    if (!user) {
        return crow::response{404, "User not found"};
    }
    return crow::response{200, UserSerializer::serializeOptionalUser(user).dump()};
}

crow::response UserController::createUser(const crow::request &req) const {
    std::string contentType = req.get_header_value("Content-Type");

    if (contentType.find("multipart/form-data") != std::string::npos) {
        const size_t boundaryPos = contentType.find("boundary=");
        if (boundaryPos == std::string::npos) {
            return crow::response{400, "No boundary in Content-Type"};
        }
        const std::string boundary = contentType.substr(boundaryPos + 9);

        auto form = FormData::parse(req.body, boundary);

        if (db.getUserByUsername(form["username"]).has_value()) {
            const json res = {
                {"error", "User with this username already exists"}
            };
            return crow::response{400, res.dump()};
        }

        form["password"] = Hash::hash(form["password"].c_str());

        std::string path = "/users/" + form["username"] + ".jpg";
        std::ofstream file("../frontend/public" + path, std::ios::binary);
        file.write(form["photo"].c_str(), static_cast<std::streamsize>(form["photo"].size()));
        file.close();
        form["imagePath"] = path;

        const User user{
            0,
            form["username"],
            form["firstname"],
            form["lastname"],
            form["email"],
            form["password"],
            form["phoneNumber"],
            form["imagePath"],
            form["country"],
            form["language"],
            form["specialties"],
            form["skills"],
            form["additionalInfo"]
        };

        db.insertUser(user);

        std::string token = Token::generateToken(form["username"]);

        const json j = {
            {"token", token}
        };

        crow::response res;
        res.code = 201;
        res.add_header("Set-Cookie", "token=" + token + "; HttpOnly; SameSite=Strict; Path=/");
        res.body = j.dump();

        return res;
    }

    return crow::response{400, "Unsupported content type"};
}

crow::response UserController::login(const crow::request &req) const {
    std::string contentType = req.get_header_value("Content-Type");

    if (contentType.find("multipart/form-data") != std::string::npos) {
        const size_t boundaryPos = contentType.find("boundary=");
        if (boundaryPos == std::string::npos) {
            return crow::response{400, "No boundary in Content-Type"};
        }
        const std::string boundary = contentType.substr(boundaryPos + 9);

        auto form = FormData::parse(req.body, boundary);

        const auto user = db.getUserByUsername(form["username"]);
        if (!user.has_value() || !Hash::equal(user->getPassword(), form["password"])) {
            return crow::response{401, "Invalid credentials"};
        }

        std::string token = Token::generateToken(form["username"]);

        const json j = {
            {"token", token}
        };

        crow::response res;
        res.code = 200;
        res.add_header("Set-Cookie", "token=" + token + "; HttpOnly; SameSite=None; Path=/");
        res.body = j.dump();

        return res;
    }

    return crow::response{400, "Unsupported content type"};
}

// template<typename App>
// crow::response UserController::getMe(App &app, const crow::request &req) const {
//     auto &ctx = app.template get_context<AuthMiddleware>(req);
//
//     if (!ctx.auth.authorized) {
//         return crow::response{401, "Unauthorized"};
//     }
//
//     auto user = db.getUserByUsername(ctx.auth.username);
//
//     return crow::response{UserSerializer::serializeOptionalUser(user).dump()};
// }
