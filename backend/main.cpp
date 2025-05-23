#include "crow.h"
#include "db/Database.h"
#include "routes/Routes.h"
#include "../middleware/AuthMiddleware.h"
#include "crow/middlewares/cors.h"
#include <cstdlib>

int main() {
    crow::App<AuthMiddleware, crow::CORSHandler> app;

    auto& cors = app.get_middleware<crow::CORSHandler>();

    cors
      .global()
        .headers("X-Custom-Header", "Upgrade-Insecure-Requests")
        .methods("GET"_method, "POST"_method, "PUT"_method, "DELETE"_method, "OPTIONS"_method)
        .allow_credentials()
      .prefix("/cors")
        .origin("*")
      .prefix("/nocors")
        .ignore();

    const char *env = std::getenv("DB_CONN_STRING");
    Database db(env);
    [[maybe_unused]] Routes routes(app, db);

    app.port(8000).multithreaded().run();
}
