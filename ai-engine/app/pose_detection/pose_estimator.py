import cv2
import mediapipe as mp


class PoseEstimator:
    """
    Detect human body landmarks using MediaPipe Pose.
    """

    def __init__(self):

        self.mp_pose = mp.solutions.pose

        self.pose = self.mp_pose.Pose(
            static_image_mode=True,
            model_complexity=2,
            enable_segmentation=False,
            min_detection_confidence=0.7
        )


    def detect_pose(self, image):

        """
        Receives processed image from ImageProcessor.

        Args:
            image:
                OpenCV image array

        Returns:
            Dictionary containing landmarks
        """

        if image is None:
            return {
                "status": "error",
                "message": "Invalid image"
            }


        # OpenCV uses BGR
        # MediaPipe expects RGB

        rgb_image = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2RGB
        )


        result = self.pose.process(
            rgb_image
        )


        if not result.pose_landmarks:

            return {
                "status": "error",
                "message": "No human detected"
            }


        landmarks = {}


        for index, landmark in enumerate(
            result.pose_landmarks.landmark
        ):

            landmarks[index] = {

                "x": landmark.x,
                "y": landmark.y,
                "z": landmark.z,
                "visibility": landmark.visibility

            }


        return {

            "status": "success",

            "landmark_count": len(landmarks),

            "landmarks": landmarks

        }