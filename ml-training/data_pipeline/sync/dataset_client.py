import requests
import os


DATASET_SERVICE_URL = "http://127.0.0.1:8000"

RAW_DATASET_PATH = "dataset/raw"


class DatasetClient:


    def __init__(self):

        os.makedirs(
            RAW_DATASET_PATH,
            exist_ok=True
        )



    def fetch_samples(self):

        response = requests.get(
            f"{DATASET_SERVICE_URL}/dataset/list"
        )

        response.raise_for_status()

        data = response.json()

        return data["samples"]



    def download_image(self, filename):

        url = (
            f"{DATASET_SERVICE_URL}"
            f"/dataset/image/{filename}"
        )


        response = requests.get(
            url
        )

        response.raise_for_status()


        save_path = os.path.join(
            RAW_DATASET_PATH,
            filename
        )


        with open(
            save_path,
            "wb"
        ) as file:

            file.write(
                response.content
            )


        return save_path




    def sync(self):


        samples = self.fetch_samples()


        synced_samples = []



        for sample in samples:


            sample_id = sample["id"]

            image_path = sample["image"]

            height = sample["height"]


            # Optional metadata
            # prevents crash if old records don't have these fields

            gender = sample.get(
                "gender",
                None
            )


            age = sample.get(
                "age",
                None
            )


            weight = sample.get(
                "weight",
                None
            )


            camera_distance = sample.get(
                "camera_distance",
                None
            )



            filename = os.path.basename(
                image_path
            )



            print(
                f"Downloading {filename}"
            )



            local_path = self.download_image(
                filename
            )



            data = {


                "id": sample_id,


                "image": local_path,


                "height": height,


                "gender": gender,


                "age": age,


                "weight": weight,


                "camera_distance": camera_distance


            }



            print(data)



            synced_samples.append(
                data
            )



        return synced_samples