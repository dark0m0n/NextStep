cmake_minimum_required(VERSION 3.29)
project(oop)

set(CMAKE_CXX_STANDARD 20)

add_executable(oop main.cpp)

target_include_directories(oop PRIVATE /usr/include)
target_link_libraries(oop PRIVATE pqxx pq)
