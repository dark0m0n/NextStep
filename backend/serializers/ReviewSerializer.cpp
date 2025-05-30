#include "ReviewSerializer.h"
#include "../db/Database.h"
#include "UserSerializer.h"

json ReviewSerializer::serializeReview(const Review &review) {
    return {
        {"id", review.getId()},
        {"user", UserSerializer::serializeOptionalUser(Database::getUserById(review.getUserID()))},
        {"startupID", review.getStartupID()},
        {"comment", review.getText()},
        {"rating", review.getRating()},
        {"createdAt", review.getCreatedAt()}
    };
}

json ReviewSerializer::serializeReviews(const std::vector<Review> &reviews) {
    json j = json::array();
    for (const auto &review: reviews) {
        j.push_back(serializeReview(review));
    }
    return j;
}

json ReviewSerializer::serializeOptionalReviews(const std::optional<Review> &review) {
    if (review.has_value()) {
        return serializeReview(review.value());
    }
    return nullptr;
}

Review ReviewSerializer::deserializeReview(const json &j) {
    return Review{
        j.at("id").get<int>(),
        j.at("userID").get<int>(),
        j.at("startupID").get<int>(),
        j.at("comment").get<std::string>(),
        j.at("rating").get<int>(),
        ""
    };
}
