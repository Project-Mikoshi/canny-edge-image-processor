from decouple import config

SERVER_PORT = int(config("SERVER_PORT"))
SERVER_HOST = str(config("SERVER_HOST"))
STATIC_FILE_DIR_PATH = "../client/dist"
STATIC_FILE_TEMPLATE_PATH = "../client/dist/index.html"

