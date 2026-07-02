from app.preprocessing.image_processor import ImageProcessor
from app.pose_detection.pose_estimator import PoseEstimator
from app.feature_extraction.extractor import FeatureExtractor
from app.prediction.model_loader import load_active_model




class HeightPredictor:


    def __init__(self):

        self.processor = ImageProcessor()
        self.pose = PoseEstimator()
        self.extractor = FeatureExtractor()
        
        self.reload_model()

    def reload_model(self):

        self.model = load_active_model()

        print("Model reloaded successfully.")


    def predict(
        self,
        image_path,
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



        if gender.lower() == "male":
            gender = 1
        else:
            gender = 0



        X = [[

            data["shoulder_width"],
            data["hip_width"],
            data["torso_length"],
            data["leg_length"],
            age,
            weight,
            camera_distance,
            gender

        ]]

        self.model = load_active_model()
        
        
        prediction = self.model.predict(
            X
        )


        return round(
            float(prediction[0]),
            2
        )
        
    def reload_model(self):

        self.model = load_active_model()

        return True