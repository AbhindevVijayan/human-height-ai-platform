from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import subprocess
import sys
import shutil
import os
import time
import requests
import json

from fastapi.middleware.cors import CORSMiddleware
from app.prediction.predictor import HeightPredictor

app = FastAPI(
    title="Human Height AI Engine"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



TEMP_PATH = "temp_uploads"
MODEL_REGISTRY = "../ml-training/models/model_registry.json"

os.makedirs(
    TEMP_PATH,
    exist_ok=True
)



predictor = HeightPredictor()




@app.get("/")
def home():

    return {
        "service": "ai-engine",
        "status": "running"
    }




@app.post("/predict")
async def predict_height(

    image: UploadFile = File(...),

    age: int = Form(...),

    weight: float = Form(...),

    camera_distance: float = Form(...),

    gender: str = Form(...)

):


    start_time = time.time()



    image_path = os.path.join(
        TEMP_PATH,
        image.filename
    )



    with open(
        image_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            image.file,
            buffer
        )



    prediction = predictor.predict(

        image_path,

        age,

        weight,

        camera_distance,

        gender

    )



    if prediction is None:

        return JSONResponse(

            {
                "error": "Prediction failed"
            },

            status_code=400

        )



    processing_time = round(
        time.time() - start_time,
        3
    )



    # Save prediction history to dataset-service
    try:

        requests.post(

            "http://127.0.0.1:8000/prediction/save",

            json={

                "image": image.filename,

                "predicted_height": prediction,

                "age": age,

                "weight": weight,

                "gender": gender,

                "camera_distance": camera_distance,

                "processing_time": processing_time

            },

            timeout=3

        )


    except Exception as e:

        print(
            "Prediction logging failed:",
            e
        )




    return {

        "predicted_height": prediction,

        "unit": "cm",

        "processing_time": processing_time

    }
    
    
@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "ai-engine"
    }
    
@app.get("/model/info")
def model_info():

    try:

        with open(MODEL_REGISTRY, "r") as file:

            registry = json.load(file)


        return {

            "active_model": registry["active_model"],

            "algorithm": registry["algorithm"],

            "features": registry["features"],

            "samples": registry["samples"],

            "trained_at": registry["trained_at"]

        }


    except Exception as e:

        return {

            "error": str(e)

        }
    
@app.post("/train")
def train_model():

    try:

        result = subprocess.run(

            [
                sys.executable,
                "../ml-training/pipeline.py"
            ],

            capture_output=True,

            text=True,

            check=True

        )

        return {

            "status": "completed",

            "message": "Training finished successfully.",

            "logs": result.stdout

        }

    except subprocess.CalledProcessError as e:

        return {

            "status": "failed",

            "logs": e.stdout,

            "error": e.stderr

        }
@app.post("/model/reload")
def reload_model():

    predictor.reload_model()

    return {
        "status": "success",
        "message": "Latest model loaded."
    }