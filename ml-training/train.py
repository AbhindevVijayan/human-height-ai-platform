import pandas as pd
import os
import json

from datetime import datetime

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

import joblib



DATASET_PATH = "dataset/features.csv"

MODEL_DIR = "models"

REGISTRY_PATH = "models/model_registry.json"





def get_next_version():

    os.makedirs(
        MODEL_DIR,
        exist_ok=True
    )


    existing_models = [

        file for file in os.listdir(MODEL_DIR)

        if file.startswith("height_model_v")

        and file.endswith(".pkl")

    ]


    if not existing_models:

        return 1



    versions = []


    for model in existing_models:

        number = model.replace(
            "height_model_v",
            ""
        ).replace(
            ".pkl",
            ""
        )


        versions.append(
            int(number)
        )


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


    data = pd.read_csv(

        DATASET_PATH

    )


    print("Dataset loaded")

    print(data)



    # Convert gender text into numerical value

    data["gender"] = data["gender"].map({

        "male": 1,

        "female": 0

    })



    # Replace missing values

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


        print(
            "Small dataset detected. Training with all samples."
        )


        X_train = X

        y_train = y

        X_test = X

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





    error = mean_absolute_error(

        y_test,

        predictions

    )



    print(

        f"Mean Absolute Error: {error}"

    )





    version = get_next_version()



    model_name = (

        f"height_model_v{version}.pkl"

    )



    model_path = os.path.join(

        MODEL_DIR,

        model_name

    )





    joblib.dump(

        model,

        model_path

    )





    update_registry(

        model_name,

        len(data)

    )





    print(

        f"Model saved: {model_name}"

    )


    print(

        "Registry updated successfully"

    )







if __name__ == "__main__":

    train_model()