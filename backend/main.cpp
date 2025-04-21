#include "crow.h"
#include "db/Database.h"
#include "routes/Routes.h"
#include <cstdlib>
#include <laserpants/dotenv/dotenv.h>

int main()
{
    dotenv::init(); // завантажує .env
    crow::SimpleApp app;

    const char *env = std::getenv("DB_CONN_STRING");
    if (!env)
    {
        std::cerr << "DB_CONN_STRING not set!" << std::endl;
        return 1;
    }

    Database db(env);
    Routes routes(app, db);

    app.port(18080).multithreaded().run();
}