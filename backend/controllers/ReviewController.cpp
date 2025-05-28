#include "ReviewController.h"
#include "../serializers/ReviewSerializer.h"
#include "../utils/FormData.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

ReviewController::ReviewController(Database &db) : db(db) {
}

crow::response ReviewController::getAllReviews(const int startupID) const {
    const auto reviews = db.getAllReviews(startupID);
    return crow::response{200, ReviewSerializer::serializeReviews(reviews).dump()};
}

crow::response ReviewController::getReviewById(const int id) const {
    const auto review = db.getReviewById(id);
    if (!review) {
        return crow::response{404, "Review not found"};
    }
    return crow::response{200, ReviewSerializer::serializeOptionalReviews(review).dump()};
}

crow::response ReviewController::createReview(const crow::request &req) const {
    std::string contentType = req.get_header_value("Content-Type");

    if (contentType.find("multipart/form-data") != std::string::npos) {
        const size_t boundaryPos = contentType.find("boundary=");
        if (boundaryPos == std::string::npos) {
            return crow::response{400, "No boundary in Content-Type"};
        }
        const std::string boundary = contentType.substr(boundaryPos + 9);

        auto form = FormData::parse(req.body, boundary);

        const Review review{
            0,
            std::stoi(form["userID"]),
            std::stoi(form["startupID"]),
            form["comment"],
            std::stoi(form["rating"]),
            ""
        };

        db.insertReview(review);
        return crow::response{201};
    }

    return crow::response{400, "Unsupported content type"};
}
