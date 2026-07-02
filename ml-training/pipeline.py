import os
import sys
import subprocess
import requests

from data_pipeline.sync.dataset_client import DatasetClient
from data_pipeline.dataset_processor import DatasetProcessor


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TRAIN_SCRIPT = os.path.join(
    BASE_DIR,
    "train.py"
)


def run_pipeline():

    print("=" * 50)
    print("Human Height AI Training Pipeline")
    print("=" * 50)

    print("\n[1/3] Syncing dataset...")

    client = DatasetClient()

    client.sync()

    print("\n[2/3] Generating features...")

    processor = DatasetProcessor()

    processor.process()

    print("\n[3/3] Training model...")

    subprocess.run(
        [
            sys.executable,
            TRAIN_SCRIPT
        ],
        cwd=BASE_DIR,
        check=True
    )

    print("\nReloading AI Engine model...")

    try:

        response = requests.post(
            "http://127.0.0.1:9000/model/reload",
            timeout=10
        )

        if response.status_code == 200:

            print("AI Engine model reloaded successfully.")

        else:

            print(
                "Model reload request failed:",
                response.text
            )

    except Exception as e:

        print(
            "Could not contact AI Engine:",
            e
        )

    print("\nPipeline completed successfully")


if __name__ == "__main__":

    run_pipeline()