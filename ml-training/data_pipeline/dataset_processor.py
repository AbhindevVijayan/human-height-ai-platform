import csv
import os
from data_pipeline.sync.dataset_client import DatasetClient
from feature_generator import FeatureGenerator


OUTPUT_FILE = "dataset/features.csv"


class DatasetProcessor:


    def __init__(self):

        self.client = DatasetClient()
        self.generator = FeatureGenerator()



    def process(self):


        people = self.client.sync()


        rows = []


        for person in people:


            image_path = person["image"]

            print(
                f"Processing {image_path}"
            )


            features = self.generator.process_image(

                image_path,

                person["height"],

                person["age"],

                person["weight"],

                person["camera_distance"],

                person["gender"]

            )


            if features:

                rows.append(features)



        if rows:
            
            file_exists = os.path.exists(OUTPUT_FILE)


            with open(

                OUTPUT_FILE,

                "a",

                newline=""

            ) as file:


                writer = csv.DictWriter(

                    file,

                    fieldnames=rows[0].keys()

                )


                if not file_exists:
                 writer.writeheader()

                writer.writerows(rows)



            print(
                "Feature dataset generated"
            )


        else:

            print(
                "No valid samples"
            )



if __name__ == "__main__":

    DatasetProcessor().process()