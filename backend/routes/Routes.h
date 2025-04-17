#pragma once
#include "crow.h"
#include "../db/Database.h"

class Routes
{
private:
    
public:
    Routes(crow::SimpleApp& app, Database& db);
    ~Routes();
};

Routes::Routes(crow::SimpleApp& app, Database& db)
{   
}

Routes::~Routes()
{
}

