from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func

from .db import Base



class DatasetSample(Base):

    __tablename__ = "dataset_samples"

    id = Column(Integer, primary_key=True, index=True)

    image = Column(String(255), nullable=False)

    height = Column(Float, nullable=False)

    gender = Column(String(20))

    age = Column(Integer)

    weight = Column(Float)

    camera_distance = Column(Float)



class PredictionHistory(Base):

    __tablename__ = "prediction_history"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    image = Column(
        String(255),
        nullable=False
    )


    predicted_height = Column(
        Float,
        nullable=False
    )


    gender = Column(
        String(20)
    )


    age = Column(
        Integer
    )


    weight = Column(
        Float
    )


    camera_distance = Column(
        Float
    )


    processing_time = Column(
        Float
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )