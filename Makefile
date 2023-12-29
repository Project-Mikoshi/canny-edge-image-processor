.PHONY: install-client install-server install build start-server start-client run

SRC_DIR = app

CLIENT_DIR = ${SRC_DIR}/client

SERVER_DIR = ${SRC_DIR}/server

# ======== installation ==========
install-client:
	cd $(CLIENT_DIR) && npm install

install-server:
	cd $(SERVER_DIR) && poetry install

install: install-client install-server

# ======== build =================
build:
	cd $(CLIENT_DIR) && npm run build

# ======== development ===========
start-server:
	cd $(SERVER_DIR) && poetry run dev

start-client:
	cd $(CLIENT_DIR) && npm start

run: install build-client start-server
