#pragma once
#include <pqxx/pqxx>
#include "../errors/DbConnectionError.h"
#include "../models/User.h"
#include "../models/Startup.h"
#include "../models/Review.h"
#include "../models/Chat.h"
#include "../models/ChatMember.h"
#include "../models/Message.h"
#include <cstdlib>


inline std::string connInfo = std::getenv("DB_CONN_STRING");

class Database {
    // const char *env = std::getenv("DB_CONN_STRING");
    // std::string connInfo = env;

public:
    explicit Database(const std::string &connInfo);

    [[nodiscard]] static std::vector<User> getAllUsers();
    [[nodiscard]] static std::optional<User> getUserById(int id);
    [[nodiscard]] static std::optional<User> getUserByUsername(const std::string &username);
    static void insertUser(const User &user);
    static void deleteUser(int id);
    static void updateUser(const User &user);

    [[nodiscard]] static std::vector<Startup> getAllStartups();
    [[nodiscard]] static std::optional<Startup> getStartupById(int id);
    static void insertStartup(const Startup &startup);
    static void deleteStartup(int id);
    static void updateStartup(const Startup &startup);

    [[nodiscard]] static std::vector<Review> getAllReviews(int startupID);
    [[nodiscard]] static std::optional<Review> getReviewById(int id);
    static void insertReview(const Review &review);

    [[nodiscard]] static std::vector<Chat> getAllChats(int userID);
    [[nodiscard]] static std::optional<Chat> getChatById(int id);
    static int insertChat(const Chat &chat);

    [[nodiscard]] static std::vector<ChatMember> getAllChatMembers(int chatID);
    [[nodiscard]] static std::optional<ChatMember> getChatMemberById(int userID);
    static void insertChatMember(const ChatMember &chatMember);

    [[nodiscard]] static std::vector<Message> getAllMessages(int chatID);
    [[nodiscard]] static std::optional<Message> getMessageById(int id);
    static void insertMessage(const Message &message);
};
