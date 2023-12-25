import base64
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import cv2 as cv
import numpy as np
from src.services.socket import socket_io
from src.services.image_process_scheduler import ImageProcessScheduler

router = APIRouter()

@router.post("/api/images/", tags=["images"])
async def handle_image_processing_request (request: Request):
    # notify client on processing status
    await socket_io.emit("updateStatus", "REQUEST_RECEIVED")

    # extract info from payload
    payload = await request.json()
    sessionID = payload['id']
    source_image_encoded: str = payload['data']

    # parse image data
    _, source_image_data = source_image_encoded.split(',')
    image_buffer = np.frombuffer(base64.b64decode(source_image_data), dtype=np.uint8)
    image: cv.Mat = cv.imdecode(image_buffer, flags=cv.IMREAD_COLOR)

    # begin processing
    ImageProcessScheduler().add_job(sessionID, image=image, onProcessComplete=lambda: socket_io.emit("updateStatus", "IMAGE_READY_FOR_RETRIEVAL"))


@router.get("/api/images/{sessionID}", tags=["images"])
async def retrieve_processed_images (sessionID: str):
    processing_outputs = ImageProcessScheduler().retrieve_result(sessionID)
    
    encoded_data = []
    
    for processed_image in processing_outputs:
        _, img_encoded = cv.imencode('.jpeg', processed_image)
        img_base64 = base64.b64encode(img_encoded).decode()
        encoded_data.append(img_base64)
        

    return JSONResponse(content={"images": encoded_data})
