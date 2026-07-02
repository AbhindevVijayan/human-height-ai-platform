from dataclasses import dataclass, asdict


@dataclass
class BodyFeatures:
    """
    Standard feature format used by
    training and inference pipelines.
    """

    shoulder_width: float
    hip_width: float
    torso_length: float
    leg_length: float


    def to_dict(self):
        return asdict(self)