import sys
import os


# Add ai-engine to Python path

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


AI_ENGINE_PATH = os.path.join(
    BASE_DIR,
    "ai-engine"
)


sys.path.append(
    AI_ENGINE_PATH
)


from app.preprocessing.image_processor import ImageProcessor
from app.pose_detection.pose_estimator import PoseEstimator
from app.feature_extraction.extractor import FeatureExtractor



class FeatureGenerator:


    def __init__(self):

        self.processor = ImageProcessor()

        self.pose = PoseEstimator()

        self.extractor = FeatureExtractor()



    def process_image(
        self,
        image_path,
        height,
        age,
        weight,
        camera_distance,
        gender
    ):


        image_result = self.processor.process(
            image_path
        )


        if image_result["status"] == "error":

            return None



        pose_result = self.pose.detect_pose(
            image_result["image"]
        )


        if pose_result["status"] == "error":

            return None



        features = self.extractor.extract_features(
            pose_result["landmarks"]
        )


        data = features.to_dict()



        # Add extra dataset metadata

        data["age"] = age

        data["weight"] = weight

        data["camera_distance"] = camera_distance

        data["gender"] = gender



        data["height"] = height



        return data




if __name__ == "__main__":


    generator = FeatureGenerator()


    result = generator.process_image(

        "dataset/raw/person.jpeg",

        175,

        56,

        70,

        2.5,

        "male"

    )


    print(result)