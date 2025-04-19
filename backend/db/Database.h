#pragma once
#include <pqxx/pqxx>
#include "../errors/DbConnectionError.h"
#include "../models/User.h"

class Database
{
private:
    pqxx::connection conn;

public:
    Database(const std::string &connInfo) : conn(connInfo)
    {
        if (!conn.is_open())
        {
            throw DbConnectionError("Failed to connect to the database.");
        }

        pqxx::work txn(conn);
        txn.exec(R"(
            CREATE TABLE IF NOT EXIST users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXIST startups (
                id SERIAL PRIMARY KEY,
                userID INTEGER REFERENCES users(id),
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                imagePath TEXT
            );

            CREATE TABLE IF NOT EXIST reviews (
                id SERIAL PRIMARY KEY,
                userID INTEGER REFERENCES users(id),
                startupID INTEGER REFERENCES reviews(id),
                text TEXT NOT NULL,
                rating INTEGER NOT NULL
            );
        )");
        txn.commit();
    }

    std::vector<User> getAllUsers()
    {
        std::vector<User> users;
        pqxx::work txn(conn);
        pqxx::result res = txn.exec("SELECT * FROM users");

        for (const auto &row : res)
        {
            users.push_back(User{
                row["id"].as<int>(),
                row["username"].as<std::string>(),
                row["firstname"].as<std::string>(),
                row["lastname"].as<std::string>(),
                row["email"].as<std::string>(),
                row["password"].as<std::string>()});
        }

        return users;
    }

    std::optional<User> getUserById(const int id)
    {
        pqxx::work txn(conn);
        pqxx::result res = txn.exec_params(
            "SELECT * FROM users WHERE id = $1;",
            id);

        if (res.empty())
        {
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
};
