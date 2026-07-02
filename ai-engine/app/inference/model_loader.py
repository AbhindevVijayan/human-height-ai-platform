import os
import json
import joblib


BASE_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../"
    )
)


REGISTRY_PATH = os.path.join(
    BASE_DIR,
    "ml-training",
    "models",
    "model_registry.json"
)


MODEL_DIR = os.path.join(
    BASE_DIR,
    "ml-training",
    "models"
)



class ModelLoader:


    def __init__(self):

        self.model = None
        self.model_name = None



    def load_model(self):

        with open(
            REGISTRY_PATH,
            "r"
        ) as file:

            registry = json.load(
                file
            )


        self.model_name = registry[
            "active_model"
        ]


        model_path = os.path.join(
            MODEL_DIR,
            self.model_name
        )


        self.model = joblib.load(
            model_path
        )


        print(
            f"Loaded model: {self.model_name}"
        )


        return self.model



    def get_model(self):

        if self.model is None:

            return self.load_model()


        return self.model