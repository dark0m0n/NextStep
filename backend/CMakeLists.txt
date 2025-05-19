cmake_minimum_required(VERSION 3.29)
project(oop)

set(CMAKE_CXX_STANDARD 20)

add_executable(oop main.cpp
        db/Database.cpp
        auth/Token.cpp
        controllers/ChatController.cpp
        controllers/ChatMemberController.cpp
        controllers/MessageController.cpp
        controllers/ReviewController.cpp
        controllers/StartupController.cpp
        controllers/UserController.cpp
        models/Chat.cpp
        models/ChatMember.cpp
        models/Message.cpp
        models/Review.cpp
        models/Startup.cpp
        models/User.cpp
        serializers/ChatMemberSerializer.cpp
        serializers/ChatSerializer.cpp
        serializers/MessageSerializer.cpp
        serializers/ReviewSerializer.cpp
        serializers/StartupSerializer.cpp
        serializers/UserSerializer.cpp
        utils/FormData.cpp
        utils/Hash.cpp
)

include(FetchContent)
FetchContent_Declare(
        jwt-cpp
        GIT_REPOSITORY https://github.com/Thalhammer/jwt-cpp.git
        GIT_TAG        v0.7.1
)
FetchContent_MakeAvailable(jwt-cpp)

target_include_directories(oop PRIVATE
    ${CMAKE_SOURCE_DIR}/db
    ${CMAKE_SOURCE_DIR}/routes
    ${CMAKE_SOURCE_DIR}/errors
    ${CMAKE_SOURCE_DIR}/models
    ${CMAKE_SOURCE_DIR}/utils
    ${CMAKE_SOURCE_DIR}/controllers
    ${CMAKE_SOURCE_DIR}/serializers
)

if (WIN32)
    message(STATUS "Configuring for Windows")

elseif (UNIX)
    message(STATUS "Configuring for Linux")
    target_include_directories(oop PRIVATE /usr/include)
    find_package(Threads REQUIRED)
    target_link_libraries(oop PRIVATE pqxx pq Threads::Threads argon2 jwt-cpp)
endif ()

