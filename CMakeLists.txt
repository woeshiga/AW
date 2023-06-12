cmake_minimum_required(VERSION 3.0)
project(AW)

set(SOURCE_FILES
    main.cpp
)

# Поиск библиотек OpenSSL
find_package(OpenSSL REQUIRED)

# SQLite
find_package(SQLite3 REQUIRED)
include_directories(${SQLite3_INCLUDE_DIRS})

# nlohmann/json
set(CMAKE_PREFIX_PATH "/usr/include/nlohmann-json_x64-linux")
find_package(nlohmann_json REQUIRED)
include_directories(${nlohmann_json_INCLUDE_DIRS})

# openssl
find_package(OpenSSL REQUIRED)
include_directories(${OPENSSL_INCLUDE_DIR})

add_executable(AW ${SOURCE_FILES})

# Включение заголовочных файлов и библиотек OpenSSL
target_include_directories(AW PRIVATE ${OPENSSL_INCLUDE_DIR})
target_link_libraries(AW PRIVATE ${OPENSSL_LIBRARIES})

target_link_libraries(AW PRIVATE ${SQLite3_LIBRARIES} ${nlohmann_json_LIBRARIES})
target_link_libraries(AW PRIVATE ${OPENSSL_LIBRARIES})

# Запрашиваем значения для конфигурационного файла
set(DB_DEFAULT "main.db" CACHE STRING "Default database")
set(HOST_DEFAULT "http://localhost" CACHE STRING "Default host")
set(PORT_DEFAULT "8080" CACHE STRING "Default port")
set(TOKEN_LIFETIME_DEFAULT "300" CACHE STRING "Default token lifetime")
set(REGISTER_PATH_DEFAULT "/api/auth/register" CACHE STRING "Default register path")
set(LOGIN_PATH_DEFAULT "/api/auth/login" CACHE STRING "Default login path")
set(LOGOUT_PATH_DEFAULT "/api/auth/logout" CACHE STRING "Default logout path")
set(GET_USER_PATH_DEFAULT "/api/users/get_user" CACHE STRING "Default get user path")
set(GET_USERS_PATH_DEFAULT "/api/users/get_users" CACHE STRING "Default get users path")
set(DELETE_USER_PATH_DEFAULT "/api/users/delete_user" CACHE STRING "Default delete user path")
set(SET_USER_STATUS_PATH_DEFAULT "/api/users/set_user_status" CACHE STRING "Default delete user path")

# Получаем путь к config.ini из аргумента командной строки
set(CONFIG_FILE_PATH ${CMAKE_BINARY_DIR} CACHE FILEPATH "Path to config.ini file")

# Получаем путь к фронтенду из агрумента командной строки
set(FRONT_PATH ${CMAKE_BINARY_DIR} CACHE STRING "Path to frontend dir")

# Create config.ini.in
file (WRITE ${FRONT_PATH}/scripts/config.js "const cfg = {DB:\"${DB_DEFAULT}\",HOST:\"${HOST_DEFAULT}\",PORT:\"${PORT_DEFAULT}\",REGISTER_PATH:\"${REGISTER_PATH_DEFAULT}\",LOGIN_PATH:\"${LOGIN_PATH_DEFAULT}\",LOGOUT_PATH:\"${LOGOUT_PATH_DEFAULT}\",GET_USER_PATH:\"${GET_USER_PATH_DEFAULT}\",GET_USERS_PATH:\"${GET_USERS_PATH_DEFAULT}\",DELETE_USER_PATH:\"${DELETE_USER_PATH_DEFAULT}\", SET_USER_STATUS_PATH_DEFAULT=\"${SET_USER_STATUS_PATH_DEFAULT}\",MEDIA_ROOT:\"./src/\",IMAGES_DIR:\"images/\"}; if (cfg.PORT!=\"\"){cfg.PORT=\":\"+cfg.PORT;}")
file(WRITE ${CONFIG_FILE_PATH}/config.ini.in "[DataBase]\nDB=${DB_DEFAULT}\n\n[Server]\nHOST=${HOST_DEFAULT}\nPORT=${PORT_DEFAULT}\nTOKEN_LIFETIME=${TOKEN_LIFETIME_DEFAULT}\n\n[API]\nREGISTER_PATH=${REGISTER_PATH_DEFAULT}\nLOGIN_PATH=${LOGIN_PATH_DEFAULT}\nLOGOUT_PATH=${LOGOUT_PATH_DEFAULT}\nGET_USER_PATH=${GET_USER_PATH_DEFAULT}\nGET_USERS_PATH=${GET_USERS_PATH_DEFAULT}\nDELETE_USER_PATH=${DELETE_USER_PATH_DEFAULT}\nSET_USER_STATUS_PATH_DEFAULT=${SET_USER_STATUS_PATH_DEFAULT}\n\n[Directories]\nMEDIA_ROOT=./src/\nIMAGES_DIR=images/\nSTATIC_ROOT=../static/")
configure_file(${CONFIG_FILE_PATH}/config.ini.in ${CMAKE_CURRENT_BINARY_DIR}/config.ini.in COPYONLY)

# Создаем конфигурационный файл
if (CONFIG_FILE_PATH)
  configure_file(
    "${CMAKE_CURRENT_BINARY_DIR}/config.ini.in"
    "${CONFIG_FILE_PATH}/config.ini"
    COPYONLY
  )
else()
  configure_file(
    "${CMAKE_BINARY_DIR}/config.ini.in"
    "${CMAKE_BINARY_DIR}/config.ini"
    COPYONLY
  )
endif()

# Команда для генерации сертификата и ключа
add_custom_command(
    OUTPUT server.pem server.key
    COMMAND openssl req -newkey rsa:2048 -nodes -keyout server.key -x509 -days 365 -out server.pem
    COMMENT "Generating SSL certificate and key"
)

# Добавление сгенерированных файлов в сборку проекта
add_executable(your_executable main.cpp server.pem server.key)

# Добавление флагов компиляции для поддержки C++11
set_property(TARGET AW PROPERTY CXX_STANDARD 11)

# Добавление заголовочной директивы для работы со строками
target_link_libraries(AW PRIVATE stdc++fs)


