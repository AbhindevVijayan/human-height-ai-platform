import os
import json
import joblib



BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)


MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)


REGISTRY_PATH = os.path.join(
    MODEL_DIR,
    "model_registry.json"
)



_current_model = None
_current_model_name = None



def get_active_model_name():

    with open(REGISTRY_PATH, "r") as file:

        registry = json.load(file)


    return registry["active_model"]




def load_active_model():

    global _current_model
    global _current_model_name


    model_name = get_active_model_name()


    # Load only if model changed
    if (
        _current_model is None
        or _current_model_name != model_name
    ):


        model_path = os.path.join(
            MODEL_DIR,
            model_name
        )


        print(
            "Loading model:",
            model_path
        )


        _current_model = joblib.load(
            model_path
        )


        _current_model_name = model_name



    return _current_model