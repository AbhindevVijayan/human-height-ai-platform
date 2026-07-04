from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from train import train_model

app = FastAPI(
    title="MeasureWise ML Training Service"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "service": "ml-training",
        "status": "running"
    }


@app.post("/training/start")
def start_training():

    result = train_model()

    return result