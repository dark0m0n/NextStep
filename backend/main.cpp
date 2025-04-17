#include "crow.h"
#include "db/Database.h"
#include "routes/Routes.h"

int main()
{
    crow::SimpleApp app;
    Database db;
    Routes routes(app, db);

    app.port(8080).multithreaded().run();
}
