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
    explicit Database(const std::string &connInfo);

    [[nodiscard]] std::vector<User> getAllUsers() const;
    [[nodiscard]] std::optional<User> getUserById(int id) const;
    [[nodiscard]] std::optional<User> getUserByUsername(const std::string &username) const;
    void insertUser(const User &user) const;

    [[nodiscard]] std::vector<Startup> getAllStartups() const;
    [[nodiscard]] std::optional<Startup> getStartupById(int id) const;
    void insertStartup(const Startup &startup) const;

    [[nodiscard]] std::vector<Review> getAllReviews(int startupID) const;
    [[nodiscard]] std::optional<Review> getReviewById(int id) const;
    void insertReview(const Review &review) const;

    [[nodiscard]] std::vector<Chat> getAllChats(int userID) const;
    [[nodiscard]] std::optional<Chat> getChatById(int id) const;
    void insertChat(const Chat &chat) const;

    [[nodiscard]] std::vector<ChatMember> getAllChatMembers(int chatID) const;
    [[nodiscard]] std::optional<ChatMember> getChatMemberById(int userID) const;
    void insertChatMember(const ChatMember &chatMember) const;

    [[nodiscard]] std::vector<Message> getAllMessages(int chatID) const;
    [[nodiscard]] std::optional<Message> getMessageById(int id) const;
    void insertMessage(const Message &message) const;
};
