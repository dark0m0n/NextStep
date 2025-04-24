#pragma once
#include <pqxx/pqxx>
#include "../errors/DbConnectionError.h"
#include "../models/User.h"
#include "../models/Startup.h"
#include "../models/Review.h"

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
                password TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS startups (
                id SERIAL PRIMARY KEY,
                userID INTEGER REFERENCES users(id),
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                imagePath TEXT
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                userID INTEGER REFERENCES users(id),
                startupID INTEGER REFERENCES reviews(id),
                text TEXT NOT NULL,
                rating INTEGER NOT NULL
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
                row["password"].as<std::string>());
        }

        return users;
    }

    [[nodiscard]] std::optional<User> getUserById(const int id) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        const pqxx::result res = txn.exec_params(
            "SELECT * FROM users WHERE id = $1;",
            id);

        if (res.empty()) {
            return std::nullopt;
        }

        const auto &row = res[0];
        User user(
            row["id"].as<int>(),
            row["username"].as<std::string>(),
            row["firstname"].as<std::string>(),
            row["lastname"].as<std::string>(),
            row["email"].as<std::string>(),
            row["password"].as<std::string>());

        return user;
    }

    void insertUser(const User &user) const {
        pqxx::connection conn(connInfo);
        pqxx::work txn(conn);
        txn.exec_params(
            "INSERT INTO users (username, firstname, lastname, email, password)"
            "VALUES ($1, $2, $3, $4, $5);",
            user.getUsername(), user.getFirstname(), user.getLastname(), user.getEmail(), user.getPassword());
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
            startup.getUserID(), startup.getTitle(), startup.getDescription(), startup.getImagePath());
        txn.commit();
    }

    [[nodiscard]] std::vector<Review> getAllReviews() const {
        pqxx::connection conn(connInfo);
        std::vector<Review> reviews;
        pqxx::work txn(conn);

        for (const pqxx::result res = txn.exec_params("SELECT * FROM reviews"); const auto &row: res) {
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

        if (res.empty()) {
            return std::nullopt;
        }

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
            review.getUserID(), review.getStartupID(), review.getText(), review.getRating());
        txn.commit();
    }
};
