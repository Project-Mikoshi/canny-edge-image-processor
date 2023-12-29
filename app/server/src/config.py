from decouple import config

SERVER_PORT = int(config("SERVER_PORT", default="8080"))
SERVER_HOST = str(config("SERVER_HOST", default="127.0.0.1"))
STATIC_FILE_DIR_PATH = "../client/dist"
STATIC_FILE_TEMPLATE_PATH = "../client/dist/index.html"
