#pragma once
#include "crow.h"
#include "../db/Database.h"
#include "UserRoute.h"
#include "StartupRoute.h"
#include "ReviewRoute.h"
#include "ChatRoute.h"
#include "MessageRoute.h"
#include "ChatMemberRoute.h"

template <typename App>
class Routes {
public:
    Routes(crow::App &app, Database &db) {
        UserRoute::registerRoutes(app, db);
        StartupRoute::registerRoutes(app, db);
        ReviewRoute::registerRoutes(app, db);
        ChatRoute::registerRoutes(app, db);
        MessageRoute::registerRoutes(app, db);
        ChatMemberRoute::registerRoutes(app, db);
    }
};
