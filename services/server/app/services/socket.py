import socketio
from ..config import STATIC_FILE_DIR_PATH, STATIC_FILE_TEMPLATE_PATH

socket_io = socketio.AsyncServer(
    async_mode="asgi"
)

socket_io_app = socketio.ASGIApp(
    socketio_server=socket_io,
    static_files={
        "/": STATIC_FILE_TEMPLATE_PATH,
        "": STATIC_FILE_DIR_PATH
    }
)
