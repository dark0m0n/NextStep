#pragma once

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
    Routes(App &app, Database &db) {
        UserRoute<App>::registerRoutes(app, db);
        StartupRoute<App>::registerRoutes(app, db);
        ReviewRoute<App>::registerRoutes(app, db);
        ChatRoute<App>::registerRoutes(app, db);
        MessageRoute<App>::registerRoutes(app, db);
        ChatMemberRoute<App>::registerRoutes(app, db);
    }
};
