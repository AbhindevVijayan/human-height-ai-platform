from .db import SessionLocal
from .models import DatasetSample, PredictionHistory


def add_sample(data):

    db = SessionLocal()

    sample = DatasetSample(**data)

    db.add(sample)
    db.commit()
    db.refresh(sample)

    db.close()

    return sample.id



def get_samples():

    db = SessionLocal()

    samples = db.query(DatasetSample).all()

    db.close()

    return [
        {
            "id": s.id,
            "image": s.image,
            "height": s.height,
            "gender": s.gender,
            "age": s.age,
            "weight": s.weight,
            "camera_distance": s.camera_distance
        }
        for s in samples
    ]



def add_prediction(data):

    db = SessionLocal()

    prediction = PredictionHistory(**data)

    db.add(prediction)

    db.commit()

    db.refresh(prediction)

    db.close()

    return prediction.id



def get_predictions():

    db = SessionLocal()

    predictions = db.query(
        PredictionHistory
    ).all()

    db.close()

    return [
        {
            "id": p.id,
            "image": p.image,
            "predicted_height": p.predicted_height,
            "gender": p.gender,
            "age": p.age,
            "weight": p.weight,
            "camera_distance": p.camera_distance,
            "processing_time": p.processing_time,
            "created_at": p.created_at
        }
        for p in predictions
    ]

def delete_sample(sample_id: int):

    db = SessionLocal()

    sample = db.query(DatasetSample).filter(
        DatasetSample.id == sample_id
    ).first()

    if sample is None:

        db.close()

        return False

    db.delete(sample)

    db.commit()

    db.close()

    return True