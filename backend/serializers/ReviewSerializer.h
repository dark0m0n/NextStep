#pragma once
#include <vector>
#include <optional>
#include <nlohmann/json.hpp>
#include "../models/Review.h"

using json = nlohmann::json;

class ReviewSerializer {
public:
    static json serializeReview(const Review &review);

    static json serializeReviews(const std::vector<Review> &reviews);

    static json serializeOptionalReviews(const std::optional<Review> &review);

    static Review deserializeReview(const json &j);
};
