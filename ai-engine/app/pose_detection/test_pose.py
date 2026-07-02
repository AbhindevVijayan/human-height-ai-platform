from app.preprocessing.image_processor import ImageProcessor
from app.pose_detection.pose_estimator import PoseEstimator


# Step 1
processor = ImageProcessor()


image_result = processor.process(
    "test_images/person.jpeg"
)


if image_result["status"] == "error":

    print(image_result)

    exit()


image = image_result["image"]


print("Image processed successfully")


# Step 2

pose = PoseEstimator()


pose_result = pose.detect_pose(
    image
)


print(pose_result)