#include "crow.h"
#include "db/Database.h"
#include "routes/Routes.h"
#include <cstdlib>

int main()
{
    crow::SimpleApp app;
    Database db(std::getenv("DB_CONN_STRING"));
    Routes routes(app, db);

    app.port(8080).multithreaded().run();
}
