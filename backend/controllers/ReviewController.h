#pragma once
#include "../db/Database.h"
#include "crow.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

class ReviewController {
    Database &db;

public:
    explicit ReviewController(Database &db);

    [[nodiscard]] crow::response getAllReviews(int startupID) const;

    [[nodiscard]] crow::response getReviewById(int id) const;

    [[nodiscard]] crow::response createReview(const crow::request &req) const;
};
