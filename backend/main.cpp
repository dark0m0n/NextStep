#include "crow.h"
#include "db/Database.h"
#include "routes/Routes.h"
#include "../middleware/AuthMiddleware.h"
#include <cstdlib>

int main() {
    crow::App<AuthMiddleware> app;
    const char *env = std::getenv("DB_CONN_STRING");
    Database db(env);
    [[maybe_unused]] Routes<crow::App<AuthMiddleware>> routes(app, db);

    app.port(8000).multithreaded().run();
}
