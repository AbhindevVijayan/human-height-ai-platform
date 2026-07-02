import csv
import os

from data_pipeline.dataset_manager import DatasetManager


LABEL_FILE = "dataset/labels.csv"
IMAGE_FOLDER = "dataset/raw"



class DatasetImporter:


    def __init__(self):

        self.manager = DatasetManager()



    def import_dataset(self):

        if not os.path.exists(LABEL_FILE):

            print(
                "labels.csv not found"
            )

            return



        with open(
            LABEL_FILE,
            "r"
        ) as file:


            reader = csv.DictReader(
                file
            )


            for row in reader:


                image_name = row["image"]

                height = float(
                    row["height"]
                )


                image_path = os.path.join(
                    IMAGE_FOLDER,
                    image_name
                ).replace("\\", "/")


                if not os.path.exists(image_path):

                    print(
                        f"Missing image: {image_path}"
                    )

                    continue



                print(
                    f"Importing {image_path}"
                )


                self.manager.add_person(
                    image_path,
                    height
                )



        print(
            "Dataset import completed"
        )



if __name__ == "__main__":


    importer = DatasetImporter()

    importer.import_dataset()