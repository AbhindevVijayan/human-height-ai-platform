from fastapi import FastAPI, UploadFile, File, Form, Body
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import os
import shutil
from app.auth import create_access_token
from app.settings import router as settings_router
from app.database.db import Base, engine
from app.database.crud import (
    add_sample,
    get_samples,
    delete_sample,
    add_prediction,
    get_predictions,
    create_user,
    authenticate_user
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Human Height Dataset Service"
)
app.include_router(settings_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STORAGE_PATH = "app/storage"

os.makedirs(
    STORAGE_PATH,
    exist_ok=True
)

# ---------------------------------------------------------
# Home
# ---------------------------------------------------------

@app.get("/")
def home():

    return {

        "service": "dataset-service",

        "status": "running"

    }


# ---------------------------------------------------------
# Dataset Upload
# ---------------------------------------------------------

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

    sample_data = {

        "image": file_path,

        "height": height,

        "gender": gender,

        "age": age,

        "weight": weight,

        "camera_distance": camera_distance

    }

    sample_id = add_sample(sample_data)

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


# ---------------------------------------------------------
# Dataset
# ---------------------------------------------------------

@app.get("/dataset/list")
def list_dataset():

    return {

        "samples": get_samples()

    }



@app.delete("/dataset/{sample_id}")
def remove_dataset(sample_id: int):

    deleted = delete_sample(sample_id)

    if deleted:

        return {
            "success": True,
            "message": "Dataset sample deleted"
        }

    return {
        "success": False,
        "message": "Sample not found"
    }

@app.get("/dataset/image/{filename}")
def get_image(filename: str):

    file_path = os.path.join(
        STORAGE_PATH,
        filename
    )

    if os.path.exists(file_path):

        return FileResponse(file_path)

    return {

        "error": "Image not found"

    }


# ---------------------------------------------------------
# Prediction History
# ---------------------------------------------------------

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


# ---------------------------------------------------------
# Admin
# ---------------------------------------------------------

@app.post("/admin/login")
def admin_login(data: dict = Body(...)):

    username = data.get("username")

    password = data.get("password")

    if username == "admin" and password == "admin123":

        return {

            "success": True,

            "message": "Login successful"

        }

    return {

        "success": False,

        "message": "Invalid credentials"

    }
    
# ---------------------------------------------------------
# Authentication Schemas
# ---------------------------------------------------------

class RegisterRequest(BaseModel):

    full_name: str

    email: EmailStr

    password: str


class LoginRequest(BaseModel):

    email: EmailStr

    password: str
    
    
# ---------------------------------------------------------
# User Registration
# ---------------------------------------------------------

@app.post("/auth/register")
def register_user(data: RegisterRequest):

    user = create_user(

        full_name=data.full_name,

        email=data.email,

        password=data.password

    )

    if user is None:

        return {

            "success": False,

            "message": "Email already exists."

        }

    return {

        "success": True,

        "message": "Registration successful.",

        "user": {

            "id": user.id,

            "full_name": user.full_name,

            "email": user.email

        }

    }


# ---------------------------------------------------------
# User Login
# ---------------------------------------------------------

@app.post("/auth/login")
def login_user(data: LoginRequest):

    user = authenticate_user(

        email=data.email,

        password=data.password

    )

    if user is None:

        return {

            "success": False,

            "message": "Invalid email or password."

        }

    token = create_access_token(

        {

            "sub": str(user.id),

            "email": user.email

        }

    )

    return {

        "success": True,

        "message": "Login successful.",

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "id": user.id,

            "full_name": user.full_name,

            "email": user.email

        }

    }