import csv
import os

from feature_generator import FeatureGenerator


LABEL_FILE = "dataset/labels.csv"

OUTPUT_FILE = "dataset/features.csv"



def generate_dataset():

    generator = FeatureGenerator()


    rows = []


    with open(
        LABEL_FILE,
        "r"
    ) as file:

        reader = csv.DictReader(file)


        for item in reader:

            image_name = item["image"]

            height = float(
                item["height"]
            )


            image_path = os.path.join(
                "dataset",
                "raw",
                image_name
            )


            print(
                f"Processing {image_name}"
            )


            features = generator.process_image(
                image_path,
                height
            )


            if features:

                rows.append(features)



    if rows:

        with open(
            OUTPUT_FILE,
            "w",
            newline=""
        ) as file:


            writer = csv.DictWriter(
                file,
                fieldnames=rows[0].keys()
            )


            writer.writeheader()

            writer.writerows(rows)


        print(
            "Dataset generated successfully"
        )


    else:

        print(
            "No valid samples found"
        )



if __name__ == "__main__":

    generate_dataset()