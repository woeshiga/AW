const cfg = {DB:"main.db",HOST:"http://localhost",PORT:"8080",REGISTER_PATH:"/api/auth/register",LOGIN_PATH:"/api/auth/login",LOGOUT_PATH:"/api/auth/logout",GET_USER_PATH:"/api/users/get_user",GET_USERS_PATH:"/api/users/get_users",DELETE_USER_PATH:"/api/users/delete_user", SET_USER_STATUS_PATH_DEFAULT:"/api/users/set_user_status",MEDIA_ROOT:"./src/",IMAGES_DIR:"images/"}; if (cfg.PORT!=""){cfg.PORT=":"+cfg.PORT;}