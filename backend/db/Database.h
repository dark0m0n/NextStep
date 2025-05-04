#pragma once
#include <pqxx/pqxx>
#include "../errors/DbConnectionError.h"
#include "../models/User.h"
#include "../models/Startup.h"
#include "../models/Review.h"
#include "../models/Chat.h"
#include "../models/ChatMember.h"
#include "../models/Message.h"

class Database {
    std::string connInfo;

public:
    explicit Database(const std::string &connInfo) : connInfo(connInfo) {
        pqxx::connection conn(connInfo);
        if (!conn.is_open()) {
            throw DbConnectionError("Failed to connect to the database.");
        }

        pqxx::work txn(conn);
        txn.exec(R"(
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                phoneNumber VARCHAR(20) UNIQUE,
                imagePath TEXT,
                country TEXT,
                languages TEXT,
                specialties TEXT,
                skills TEXT,
                additionalInfo TEXT
            );

            CREATE TABLE IF NOT EXISTS startups (
                id SERIAL PRIMARY KEY,
                userID INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                imagePath TEXT
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                userID INTEGER REFERENCES users(id) ON DELETE CASCADE,
                startupID INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
                text TEXT NOT NULL,
                rating INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS chats (
                id SERIAL PRIMARY KEY,
                isGroup BOOLEAN NOT NULL DEFAULT FALSE,
                title TEXT
            );

            CREATE TABLE IF NOT EXISTS chat_members (
                id SERIAL PRIMARY KEY,
                chatID INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
                userID INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                chatID INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
                senderID INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
                text TEXT NOT NULL,
                sendAt TIMESTAMP DEFAULT NOW()
            );
        )");
        txn.commit();
    }

    [[nodiscard]] std::vector<User> getAllUsers() const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        std::vector<User> users;

        for (const pqxx::result res = txn.exec("SELECT * FROM users"); const auto &row: res) {
            users.emplace_back(
                row["id"].as<int>(),
                row["username"].as<std::string>(),
                row["firstname"].as<std::string>(),
                row["lastname"].as<std::string>(),
                row["email"].as<std::string>(),
                row["password"].as<std::string>(),
                row["phoneNumber"].as<std::string>(),
                row["imagePath"].as<std::string>(),
                row["country"].as<std::string>(),
                row["languages"].as<std::string>(),
                row["specialties"].as<std::string>(),
                row["skills"].as<std::string>(),
                row["additionalInfo"].as<std::string>());
        }

        return users;
    }

    [[nodiscard]] std::optional<User> getUserById(const int id) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        const pqxx::result res = txn.exec_params(
            "SELECT * FROM users WHERE id = $1;",
            id);

        if (res.empty()) return std::nullopt;

        const auto &row = res[0];
        User user(
            row["id"].as<int>(),
            row["username"].as<std::string>(),
            row["firstname"].as<std::string>(),
            row["lastname"].as<std::string>(),
            row["email"].as<std::string>(),
            row["password"].as<std::string>(),
            row["phoneNumber"].as<std::string>(),
            row["imagePath"].as<std::string>(),
            row["country"].as<std::string>(),
            row["languages"].as<std::string>(),
            row["specialties"].as<std::string>(),
            row["skills"].as<std::string>(),
            row["additionalInfo"].as<std::string>());

        return user;
    }

    void insertUser(const User &user) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO users (username, firstname, lastname, email, password, phoneNumber, imagePath, country,"
            "languages, specialties, skills, additionalInfo)"
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
            user.getUsername(),
            user.getFirstname(),
            user.getLastname(),
            user.getEmail(),
            user.getPassword(),
            user.getPhoneNumber(),
            user.getImagePath(),
            user.getCountry(),
            user.getLanguage(),
            user.getSpecialties(),
            user.getSkills(),
            user.getAdditionalInfo());
        txn.commit();
    }

    [[nodiscard]] std::vector<Startup> getAllStartups() const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        std::vector<Startup> startups;

        for (const pqxx::result res = txn.exec_params("SELECT * FROM startups"); const auto &row: res) {
            startups.emplace_back(
                row["id"].as<int>(),
                row["userID"].as<int>(),
                row["title"].as<std::string>(),
                row["description"].as<std::string>(),
                row["imagePath"].as<std::string>());
        }

        return startups;
    }

    [[nodiscard]] std::optional<Startup> getStartupById(const int id) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        const pqxx::result res = txn.exec_params(
            "SELECT * FROM startups WHERE id = $1;",
            id);

        if (res.empty()) return std::nullopt;

        const auto &row = res[0];
        Startup startup(
            row["id"].as<int>(),
            row["userID"].as<int>(),
            row["title"].as<std::string>(),
            row["description"].as<std::string>(),
            row["imagePath"].as<std::string>());

        return startup;
    }

    void insertStartup(const Startup &startup) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO startups (userID, title, description, imagePath)"
            "VALUES ($1, $2, $3, $4);",
            startup.getUserID(),
            startup.getTitle(),
            startup.getDescription(),
            startup.getImagePath());
        txn.commit();
    }

    [[nodiscard]] std::vector<Review> getAllReviews(const int startupID) const {
        pqxx::connection conn(connInfo);
        std::vector<Review> reviews;
        pqxx::work txn(conn);

        for (const pqxx::result res = txn.exec_params("SELECT * FROM reviews WHERE startupID = $1", startupID);
             const auto &row: res) {
            reviews.emplace_back(
                row["id"].as<int>(),
                row["userID"].as<int>(),
                row["startupID"].as<int>(),
                row["text"].as<std::string>(),
                row["rating"].as<int>());
        }

        return reviews;
    }

    [[nodiscard]] std::optional<Review> getReviewById(const int id) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        const pqxx::result res = txn.exec_params(
            "SELECT * FROM reviews WHERE id = $1;",
            id);

        if (res.empty()) return std::nullopt;

        const auto &row = res[0];
        Review review(
            row["id"].as<int>(),
            row["userID"].as<int>(),
            row["startupID"].as<int>(),
            row["text"].as<std::string>(),
            row["rating"].as<int>());

        return review;
    }

    void insertReview(const Review &review) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO reviews (userID, startupID, text, rating)"
            "VALUES ($1, $2, $3, $4);",
            review.getUserID(),
            review.getStartupID(),
            review.getText(),
            review.getRating());
        txn.commit();
    }

    [[nodiscard]] std::vector<Chat> getAllChats(const int userID) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        std::vector<Chat> chats;

        for (const pqxx::result res = txn.exec_params("SELECT * FROM chats WHERE userID = $1", userID);
             const auto &row: res) {
            chats.emplace_back(
                row["id"].as<int>(),
                row["isGroup"].as<bool>(),
                row["title"].as<std::string>());
        }

        return chats;
    }

    [[nodiscard]] std::optional<Chat> getChatById(const int id) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        const pqxx::result res = txn.exec_params(
            "SELECT * FROM chats WHERE id = $1",
            id);

        if (res.empty()) return std::nullopt;

        const auto &row = res[0];
        Chat chat(
            row["id"].as<int>(),
            row["isGroup"].as<bool>(),
            row["title"].as<std::string>());

        return chat;
    }

    void insertChat(const Chat &chat) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO chats (isGroup, title)"
            "VALUES ($1, $2);",
            chat.getIsGroup(),
            chat.getTitle());
        txn.commit();
    }

    [[nodiscard]] std::vector<ChatMember> getAllChatMembers(const int chatID) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        std::vector<ChatMember> chatMembers;

        for (const pqxx::result res = txn.exec_params("SELECT * FROM chat_members WHERE chatID = $1", chatID);
             const auto &row: res) {
            chatMembers.emplace_back(
                row["id"].as<int>(),
                row["chatID"].as<int>(),
                row["userID"].as<int>());
        }

        return chatMembers;
    }

    [[nodiscard]] std::optional<ChatMember> getChatMemberById(const int userID) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        const pqxx::result res = txn.exec_params(
            "SELECT * FROM chat_members WHERE userID = $1",
            userID);

        if (res.empty()) return std::nullopt;

        const auto &row = res[0];
        ChatMember chatMember(
            row["id"].as<int>(),
            row["chatID"].as<int>(),
            row["userID"].as<int>());

        return chatMember;
    }

    void insertChatMember(const ChatMember &chatMember) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO chat_members (chatID, userID)"
            "VALUES ($1, $2);",
            chatMember.getChatID(),
            chatMember.getUserID());
        txn.commit();
    }

    [[nodiscard]] std::vector<Message> getAllMessages(const int chatID) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        std::vector<Message> messages;

        for (const pqxx::result res = txn.exec_params("SELECT * FROM messages WHERE chatID = $1", chatID);
             const auto &row: res) {
            messages.emplace_back(
                row["id"].as<int>(),
                row["chatID"].as<int>(),
                row["senderID"].as<int>(),
                row["text"].as<std::string>());
        }

        return messages;
    }

    [[nodiscard]] std::optional<Message> getMessageById(const int id) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        const pqxx::result res = txn.exec_params(
            "SELECT * FROM messages WHERE id = $1;",
            id);

        if (res.empty()) return std::nullopt;

        const auto &row = res[0];
        Message message(
            row["id"].as<int>(),
            row["chatID"].as<int>(),
            row["senderID"].as<int>(),
            row["text"].as<std::string>());

        return message;
    }

    void insertMessage(const Message &message) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO messages (chatID, senderID, text)"
            "VALUES ($1, $2, $3);",
            message.getChatID(),
            message.getSenderID(),
            message.getText());
        txn.commit();
    }
};
