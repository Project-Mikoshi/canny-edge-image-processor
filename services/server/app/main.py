from fastapi import FastAPI
from .config import SERVER_HOST, SERVER_PORT
from .services.socket import socket_io_app
from .routers import images
import uvicorn

app = FastAPI()
app.include_router(images.router)
app.mount("/", socket_io_app)

def dev ():
    uvicorn.run("app.main:app", host=SERVER_HOST, port=SERVER_PORT, reload=True)
