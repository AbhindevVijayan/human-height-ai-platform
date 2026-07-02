import json
import os
from datetime import datetime


REGISTRY_FILE = "models/model_registry.json"



def save_model_metadata(
    version,
    samples,
    algorithm
):

    metadata = {

        "active_model": version,

        "algorithm": algorithm,

        "samples": samples,

        "trained_at": datetime.now().isoformat()

    }


    with open(
        REGISTRY_FILE,
        "w"
    ) as file:

        json.dump(
            metadata,
            file,
            indent=4
        )



def get_active_model():

    if not os.path.exists(REGISTRY_FILE):

        return None


    with open(
        REGISTRY_FILE,
        "r"
    ) as file:

        data = json.load(file)


    return data



if __name__ == "__main__":

    save_model_metadata(
        "height_model_v1.pkl",
        1,
        "RandomForestRegressor"
    )

    print(
        get_active_model()
    )