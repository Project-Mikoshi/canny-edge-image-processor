import cv2 as cv
import numpy as np

class ImageProcessor:
    image_source: cv.Mat
    image_outputs: list[cv.Mat]
    
    def __init__(self) -> None:
        self.image_source: cv.Mat = []
        self.image_outputs: list[cv.Mat] = []
    
    def run (self, image: cv.Mat):
        self.image_source = image
        self.image_outputs.append(image)
        self.detect_edges()
        self.bucket_colors()

        return self.image_outputs

    def detect_edges (self) -> cv.Mat:
        """
        Canny edge detector.
        """
        return cv.Canny(self.image_source, 100, 200)

    def bucket_colors (self) -> None:
        """
        Determine colors of each features and bucket them into specific categories.
        """       
        image_hsv = cv.cvtColor(self.image_source, cv.COLOR_BGR2HSV)
        edge_mask = self.detect_edges()

        colors = {
            'BLUE': (
                np.array([110, 50, 50]),
                np.array([130, 255, 255]),
            ),
            'RED': (
                np.array([0, 50, 50]),
                np.array([10, 255, 255]),
            ),
            'GREEN': (
                np.array([50, 50, 50]),
                np.array([70, 255, 255]),
            ),
            'YELLOW': (
                np.array([20, 50, 50]),
                np.array([40, 255, 255]),
            ),
        }

        for color, (lower_bound, upper_bound) in colors.items():
            color_mask = cv.inRange(image_hsv, lower_bound, upper_bound)
            combined_mask = cv.bitwise_or(edge_mask, color_mask)
            output = cv.bitwise_and(self.image_source, self.image_source, mask=combined_mask)
            self.image_outputs.append(output)
