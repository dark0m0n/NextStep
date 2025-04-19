#include "crow.h"
#include "db/Database.h"
#include "routes/Routes.h"
#include <cstdlib>

int main()
{
    crow::SimpleApp app;
    const char* env = std::getenv("DB_CONN_STRING");
    Database db(env);
    Routes routes(app, db);

    app.port(8080).multithreaded().run();
}
