import math

from app.feature_extraction.feature_schema import BodyFeatures


class FeatureExtractor:
    """
    Converts MediaPipe pose landmarks
    into numerical body features.
    """

    def calculate_distance(self, point1, point2):

        return math.sqrt(
            (point1["x"] - point2["x"]) ** 2 +
            (point1["y"] - point2["y"]) ** 2
        )


    def extract_features(self, landmarks):

        """
        Extract body measurements from landmarks.
        """

        left_shoulder = landmarks[11]
        right_shoulder = landmarks[12]

        left_hip = landmarks[23]
        right_hip = landmarks[24]

        left_knee = landmarks[25]
        right_knee = landmarks[26]

        left_ankle = landmarks[27]
        right_ankle = landmarks[28]


        shoulder_width = self.calculate_distance(
            left_shoulder,
            right_shoulder
        )


        hip_width = self.calculate_distance(
            left_hip,
            right_hip
        )


        torso_length = self.calculate_distance(
            left_shoulder,
            left_hip
        )


        left_leg = (
            self.calculate_distance(
                left_hip,
                left_knee
            )
            +
            self.calculate_distance(
                left_knee,
                left_ankle
            )
        )


        right_leg = (
            self.calculate_distance(
                right_hip,
                right_knee
            )
            +
            self.calculate_distance(
                right_knee,
                right_ankle
            )
        )


        leg_length = (
            left_leg + right_leg
        ) / 2


        return BodyFeatures(

            shoulder_width=shoulder_width,

            hip_width=hip_width,

            torso_length=torso_length,

            leg_length=leg_length

        )