from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse

import os
import shutil
from app.database.db import Base, engine
from app.database.models import DatasetSample, PredictionHistory
from app.database.crud import (
    add_sample,
    get_samples,
    add_prediction,
    get_predictions
)

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Human Height Dataset Service"
)


STORAGE_PATH = "app/storage"


os.makedirs(
    STORAGE_PATH,
    exist_ok=True
)



@app.get("/")
def home():

    return {
        "service": "dataset-service",
        "status": "running"
    }



@app.post("/dataset/upload")
async def upload_dataset(

    image: UploadFile = File(...),

    height: float = Form(...),

    gender: str = Form(None),

    age: int = Form(None),

    weight: float = Form(None),

    camera_distance: float = Form(None)

):


    file_path = os.path.join(
        STORAGE_PATH,
        image.filename
    ).replace("\\", "/")



    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            image.file,
            buffer
        )



    sample_id = add_sample(

        file_path,

        height,

        gender,

        age,

        weight,

        camera_distance

    )



    if sample_id is None:

        return {

            "status": "duplicate",

            "image": image.filename

        }



    return {

        "id": sample_id,

        "image": file_path,

        "height": height,

        "gender": gender,

        "age": age,

        "weight": weight,

        "camera_distance": camera_distance,

        "status": "stored"

    }




@app.get("/dataset/list")
def list_dataset():

    return {

        "samples": get_samples()

    }




@app.get("/dataset/image/{filename}")
def get_image(filename: str):

    file_path = os.path.join(

        STORAGE_PATH,

        filename

    )



    if os.path.exists(file_path):

        return FileResponse(

            file_path

        )



    return {

        "error": "Image not found"

    }
@app.get("/dataset/image/{filename}")
def get_image(filename: str):

    file_path = os.path.join(
        STORAGE_PATH,
        filename
    )

    if os.path.exists(file_path):

        return FileResponse(
            file_path
        )

    return {
        "error": "Image not found"
    }
    
@app.post("/prediction/save")
def save_prediction(data: dict):

    prediction_id = add_prediction(data)

    return {
        "id": prediction_id,
        "status": "saved"
    }



@app.get("/prediction/list")
def list_predictions():

    return {
        "predictions": get_predictions()
    }
