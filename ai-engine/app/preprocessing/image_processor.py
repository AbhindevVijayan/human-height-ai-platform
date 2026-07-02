import cv2
import os


class ImageProcessor:

    def __init__(self, target_size=(640, 640)):
        self.target_size = target_size


    def load_image(self, image_path):

        if not os.path.exists(image_path):
            return {
                "status": "error",
                "message": "Image file not found"
            }

        image = cv2.imread(image_path)

        if image is None:
            return {
                "status": "error",
                "message": "Unable to read image"
            }

        return {
            "status": "success",
            "image": image
        }


    def resize_image(self, image):

        resized = cv2.resize(
            image,
            self.target_size
        )

        return resized


    def process(self, image_path):

        result = self.load_image(image_path)

        if result["status"] == "error":
            return result


        image = result["image"]

        image = self.resize_image(image)


        return {
            "status": "success",
            "image": image,
            "width": image.shape[1],
            "height": image.shape[0]
        }