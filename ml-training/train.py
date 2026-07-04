import os
import json
import math
from datetime import datetime

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
from sklearn.model_selection import train_test_split


DATASET_PATH = "dataset/features.csv"

MODEL_DIR = "models"

REGISTRY_PATH = "models/model_registry.json"


def get_next_version():

    os.makedirs(
        MODEL_DIR,
        exist_ok=True
    )

    existing_models = [

        file

        for file in os.listdir(MODEL_DIR)

        if file.startswith("height_model_v")

        and file.endswith(".pkl")

    ]

    if not existing_models:

        return 1

    versions = []

    for model in existing_models:

        version = model.replace(

            "height_model_v",

            ""

        ).replace(

            ".pkl",

            ""

        )

        versions.append(int(version))

    return max(versions) + 1


def update_registry(

    model_name,

    samples

):

    registry = {

        "active_model": model_name,

        "algorithm": "RandomForestRegressor",

        "features": [

            "shoulder_width",

            "hip_width",

            "torso_length",

            "leg_length",

            "age",

            "weight",

            "camera_distance",

            "gender"

        ],

        "samples": samples,

        "trained_at": datetime.now().isoformat()

    }

    with open(

        REGISTRY_PATH,

        "w"

    ) as file:

        json.dump(

            registry,

            file,

            indent=4

        )


def train_model():

    if not os.path.exists(DATASET_PATH):

        return {

            "success": False,

            "message": "Dataset not found."

        }

    data = pd.read_csv(

        DATASET_PATH

    )

    if len(data) == 0:

        return {

            "success": False,

            "message": "Dataset is empty."

        }

    data["gender"] = data["gender"].map({

        "male": 1,

        "female": 0,

        "Male": 1,

        "Female": 0

    })

    data.fillna(

        0,

        inplace=True

    )

    X = data[

        [

            "shoulder_width",

            "hip_width",

            "torso_length",

            "leg_length",

            "age",

            "weight",

            "camera_distance",

            "gender"

        ]

    ]

    y = data["height"]

    if len(data) > 5:

        X_train, X_test, y_train, y_test = train_test_split(

            X,

            y,

            test_size=0.2,

            random_state=42

        )

    else:

        X_train = X

        X_test = X

        y_train = y

        y_test = y

    model = RandomForestRegressor(

        n_estimators=100,

        random_state=42

    )

    model.fit(

        X_train,

        y_train

    )

    predictions = model.predict(

        X_test

    )
        # -----------------------------
    # Model Evaluation
    # -----------------------------

    mae = mean_absolute_error(

        y_test,

        predictions

    )

    rmse = math.sqrt(

        mean_squared_error(

            y_test,

            predictions

        )

    )

    r2 = r2_score(

        y_test,

        predictions

    )

    # -----------------------------
    # Generate Model Version
    # -----------------------------

    version = get_next_version()

    model_name = f"height_model_v{version}.pkl"

    model_path = os.path.join(

        MODEL_DIR,

        model_name

    )

    # -----------------------------
    # Save Model
    # -----------------------------

    joblib.dump(

        model,

        model_path

    )

    # -----------------------------
    # Update Registry
    # -----------------------------

    update_registry(

        model_name,

        len(data)

    )

    print("\n======================================")

    print("Training Completed Successfully")

    print("======================================")

    print(f"Model : {model_name}")

    print(f"Samples : {len(data)}")

    print(f"MAE : {mae:.3f}")

    print(f"RMSE : {rmse:.3f}")

    print(f"R² Score : {r2:.4f}")

    print("======================================\n")

    return {

        "success": True,

        "message": "Model trained successfully.",

        "model": model_name,

        "algorithm": "RandomForestRegressor",

        "samples": len(data),

        "mae": round(float(mae), 3),

        "rmse": round(float(rmse), 3),

        "r2": round(float(r2), 4),

        "trained_at": datetime.now().isoformat()

    }


if __name__ == "__main__":

    result = train_model()

    print(result)