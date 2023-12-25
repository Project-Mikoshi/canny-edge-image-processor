from fastapi import FastAPI
from src.config import SERVER_HOST, SERVER_PORT
from src.services.socket import socket_io_app
from src.routers import images
import uvicorn

app = FastAPI()
app.include_router(images.router)
app.mount("/", socket_io_app)

def dev ():
    uvicorn.run("src.main:app", host=SERVER_HOST, port=SERVER_PORT, reload=True)
