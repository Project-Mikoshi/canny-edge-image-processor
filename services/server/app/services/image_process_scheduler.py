import cv2 as cv
import asyncio
import threading
from typing import Awaitable, Dict, Callable, List
from .image_processor import ImageProcessor
from .decorator import Singleton

@Singleton
class ImageProcessScheduler:
    _thread_pool = List[threading.Thread]
    _image_outputs_collection = Dict[str, List[cv.Mat]]

    def __init__(self):
        self._thread_pool = []
        self._image_outputs_collection = {}

    async def _process_image (self, id: str, image: cv.Mat, onProcessComplete: Callable[[None], Awaitable[None]]):
        image_outputs = ImageProcessor().run(image)

        self._image_outputs_collection[id] = image_outputs
        
        await onProcessComplete()

    def _start_processing (self, id: str, image: cv.Mat, onProcessComplete: Callable[[None], Awaitable[None]]):
        processing_loop = asyncio.new_event_loop()
        asyncio.set_event_loop(processing_loop)
        processing_loop.run_until_complete(self._process_image(id, image=image, onProcessComplete=onProcessComplete))
        processing_loop.close()

    def add_job (self, id: str, image: str, onProcessComplete: Callable[[None], Awaitable[None]]):
        job_thread = threading.Thread(target=self._start_processing, args=(id, image, onProcessComplete, ))
        self._thread_pool.append(job_thread)
        job_thread.start()

    def retrieve_result (self, id: str) -> List[cv.Mat]:
        return self._image_outputs_collection.get(id)
