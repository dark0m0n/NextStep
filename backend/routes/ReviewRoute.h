#pragma once
#include "../controllers/ReviewController.h"
#include "crow.h"

template <typename App>
class ReviewRoute {
public:
    static void registerRoutes(App &app, Database &db) {
        ReviewController controller(db);

        CROW_ROUTE(app, "/api/reviews/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int startupID) {
            return controller.getAllReviews(startupID);
        });

        CROW_ROUTE(app, "/api/review/<int>").methods(crow::HTTPMethod::Get)
        ([&controller](const int id) {
            return controller.getReviewById(id);
        });

        CROW_ROUTE(app, "/api/review").methods(crow::HTTPMethod::Post)
        ([&controller](const crow::request &req) {
            return controller.createReview(req);
        });
    }
};
