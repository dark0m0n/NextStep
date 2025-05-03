#pragma once
#include "../db/Database.h"
#include "../serializers/ReviewSerializer.h"
#include "crow.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

class ReviewController {
    Database &db;

public:
    explicit ReviewController(Database &db) : db(db) {
    }

    [[nodiscard]] crow::response getAllReviews(const int startupID) const {
        const auto reviews = db.getAllReviews(startupID);
        return crow::response{200, ReviewSerializer::serializeReviews(reviews)};
    }

    [[nodiscard]] crow::response getReviewById(const int id) const {
        const auto review = db.getReviewById(id);
        if (!review) {
            return crow::response{404, "Review not found"};
        }
        return crow::response{200, ReviewSerializer::serializeOptionalReviews(review).dump()};
    }

    crow::response createReview(crow::request &req) const {
        json j;
        try {
            j = json::parse(req.body);
        } catch (const std::exception &e) {
            return crow::response{400, R"({"error": "Invalid JSON"})"};
        }

        const Review review = ReviewSerializer::deserializeReview(j);
        db.insertReview(review);
        return crow::response{201};
    }
};
