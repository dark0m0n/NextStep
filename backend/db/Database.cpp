#include "Database.h"

Database::Database(const std::string &connInfo) {
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
                imagePath TEXT,
                experience TEXT,
                category TEXT,
                projectType TEXT,
                investment INTEGER,
                averageRating INTEGER,
                hiring BOOLEAN
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                userID INTEGER REFERENCES users(id) ON DELETE CASCADE,
                startupID INTEGER REFERENCES startups(id) ON DELETE CASCADE,
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
                senderID INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                text TEXT NOT NULL,
                sendAt TIMESTAMP DEFAULT NOW()
            );
        )");
    txn.commit();
}

std::vector<User> Database::getAllUsers() {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

std::optional<User> Database::getUserById(const int id) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

std::optional<User> Database::getUserByUsername(const std::string &username) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

    pqxx::work txn(conn);
    const pqxx::result res = txn.exec_params(
        "SELECT * FROM users WHERE username = $1;",
        username);

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

void Database::insertUser(const User &user) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

void Database::deleteUser(int id) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

    pqxx::work txn(conn);
    txn.exec_params(
        "DELETE FROM users WHERE id = $1;",
        id);
    txn.commit();
}

void Database::updateUser(const User &user) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database");
    }

    pqxx::work txn(conn);
    txn.exec_params(
        "UPDATE users"
        "SET username = $1, firstname = $2, lastname = $3, email = $4, phoneNumber = $5, country = $6"
        "languages = $7, specialties = $8, skills = $9, additionalInfo = $10"
        "WHERE id = $11;",
        user.getUsername(),
        user.getFirstname(),
        user.getLastname(),
        user.getEmail(),
        user.getPhoneNumber(),
        user.getCountry(),
        user.getLanguage(),
        user.getSpecialties(),
        user.getSkills(),
        user.getAdditionalInfo(),
        user.getId());
}

std::vector<Startup> Database::getAllStartups() {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

    pqxx::work txn(conn);
    std::vector<Startup> startups;

    for (const pqxx::result res = txn.exec_params("SELECT * FROM startups"); const auto &row: res) {
        startups.emplace_back(
            row["id"].as<int>(),
            row["userID"].as<int>(),
            row["title"].as<std::string>(),
            row["description"].as<std::string>(),
            row["imagePath"].as<std::string>(),
            row["experience"].as<std::string>(),
            row["category"].as<std::string>(),
            row["projectType"].as<std::string>(),
            row["investment"].as<int>(),
            row["averageRating"].as<int>(),
            row["hiring"].as<bool>());
    }

    return startups;
}

std::optional<Startup> Database::getStartupById(const int id) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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
        row["imagePath"].as<std::string>(),
        row["experience"].as<std::string>(),
        row["category"].as<std::string>(),
        row["projectType"].as<std::string>(),
        row["investment"].as<int>(),
        row["averageRating"].as<int>(),
        row["hiring"].as<bool>());

    return startup;
}

void Database::insertStartup(const Startup &startup) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

    pqxx::work txn(conn);
    txn.exec_params(
        "INSERT INTO startups (userID, title, description, imagePath, experience, category, projectType, "
        "investment, averageRating, hiring)"
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);",
        startup.getUserID(),
        startup.getTitle(),
        startup.getDescription(),
        startup.getImagePath(),
        startup.getExperience(),
        startup.getCategory(),
        startup.getProjectType(),
        startup.getInvestment(),
        startup.getAverageRating(),
        startup.getHiring());
    txn.commit();
}

std::vector<Review> Database::getAllReviews(const int startupID) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

std::optional<Review> Database::getReviewById(const int id) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

void Database::insertReview(const Review &review) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

std::vector<Chat> Database::getAllChats(const int userID) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

std::optional<Chat> Database::getChatById(const int id) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

void Database::insertChat(const Chat &chat) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

    pqxx::work txn(conn);
    txn.exec_params(
        "INSERT INTO chats (isGroup, title)"
        "VALUES ($1, $2);",
        chat.getIsGroup(),
        chat.getTitle());
    txn.commit();
}

std::vector<ChatMember> Database::getAllChatMembers(const int chatID) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

std::optional<ChatMember> Database::getChatMemberById(const int userID) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

void Database::insertChatMember(const ChatMember &chatMember) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

    pqxx::work txn(conn);
    txn.exec_params(
        "INSERT INTO chat_members (chatID, userID)"
        "VALUES ($1, $2);",
        chatMember.getChatID(),
        chatMember.getUserID());
    txn.commit();
}

std::vector<Message> Database::getAllMessages(int chatID) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

std::optional<Message> Database::getMessageById(int id) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

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

void Database::insertMessage(const Message &message) {
    pqxx::connection conn(connInfo);
    if (!conn.is_open()) {
        throw DbConnectionError("Failed to connect to the database.");
    }

    pqxx::work txn(conn);
    txn.exec_params(
        "INSERT INTO messages (chatID, senderID, text)"
        "VALUES ($1, $2, $3);",
        message.getChatID(),
        message.getSenderID(),
        message.getText());
    txn.commit();
}
