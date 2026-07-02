from app.preprocessing.image_processor import ImageProcessor
from app.pose_detection.pose_estimator import PoseEstimator
from app.feature_extraction.extractor import FeatureExtractor



processor = ImageProcessor()


image_result = processor.process(
    "test_images/person.jpeg"
)


image = image_result["image"]



pose = PoseEstimator()


pose_result = pose.detect_pose(
    image
)


landmarks = pose_result["landmarks"]



extractor = FeatureExtractor()


features = extractor.extract_features(
    landmarks
)


print(features.to_dict())