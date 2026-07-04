from .db import SessionLocal
from .models import (
    DatasetSample,
    PredictionHistory,
    User
)

from .security import (
    hash_password,
    verify_password
)

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

# ---------------------------------------------------------
# User Authentication
# ---------------------------------------------------------

def get_user_by_email(email: str):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    db.close()

    return user


def create_user(

    full_name: str,

    email: str,

    password: str

):

    db = SessionLocal()

    existing = db.query(User).filter(
        User.email == email
    ).first()

    if existing:

        db.close()

        return None

    user = User(

        full_name=full_name,

        email=email,

        password_hash=hash_password(password)

    )

    db.add(user)

    db.commit()

    db.refresh(user)

    db.close()

    return user


def authenticate_user(

    email: str,

    password: str

):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    db.close()

    if not user:

        return None

    if not verify_password(

        password,

        user.password_hash

    ):

        return None

    return user