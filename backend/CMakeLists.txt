cmake_minimum_required(VERSION 3.29)
project(oop)

set(CMAKE_CXX_STANDARD 20)

add_executable(oop main.cpp)

target_include_directories(oop PRIVATE
    ${CMAKE_SOURCE_DIR}/db
    ${CMAKE_SOURCE_DIR}/routes
    ${CMAKE_SOURCE_DIR}/errors
    ${CMAKE_SOURCE_DIR}/models
    ${CMAKE_SOURCE_DIR}/utils
    ${CMAKE_SOURCE_DIR}/controllers
)


if (WIN32)

    message(STATUS "Configuring for Windows")

    target_include_directories(oop PRIVATE
        ${CMAKE_SOURCE_DIR}/external/crow/include 
        ${CMAKE_SOURCE_DIR}/external/asio/include
        ${CMAKE_SOURCE_DIR}/external/dotenv-cpp/include
        "C:/Program Files/PostgreSQL/17/include"
    )

    # === Додати змінні для libpqxx перед add_subdirectory ===
    set(PostgreSQL_ROOT "C:/Program Files/PostgreSQL/17")
    set(PostgreSQL_INCLUDE_DIR "C:/Program Files/PostgreSQL/17/include")
    set(PostgreSQL_LIBRARY "C:/Program Files/PostgreSQL/17/lib/libpq.lib")

    add_subdirectory(external/libpqxx)
    target_link_libraries(oop PRIVATE 
        pqxx 
        "C:/Program Files/PostgreSQL/17/lib/libpq.lib"
        wsock32.lib
        ws2_32.lib
        secur32.lib
        advapi32.lib
        shell32.lib
        crypt32.lib
    )


elseif (UNIX)
    message(STATUS "Configuring for Linux")
    target_include_directories(oop PRIVATE /usr/include)
    find_package(Threads REQUIRED)
    target_link_libraries(oop PRIVATE pqxx pq Threads::Threads)
endif ()