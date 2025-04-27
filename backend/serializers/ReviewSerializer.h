#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Review.h"

using json = nlohmann::json;

class ReviewSerializer {
public:
    static json serializeReview(const Review &review) {
        return {
            {"id", review.getId()},
            {"userID", review.getUserID()},
            {"startupID", review.getStartupID()},
            {"text", review.getText()},
            {"rating", review.getRating()}
        };
    }

    static json serializeReviews(const std::vector<Review> &reviews) {
        json j = json::array();
        for (const auto &review: reviews) {
            j.push_back(serializeReview(review));
        }
        return j;
    }

    static json serializeOptionalReviews(const std::optional<Review> &review) {
        if (review.has_value()) {
            return serializeReview(review.value());
        }
        return nullptr;
    }
};
