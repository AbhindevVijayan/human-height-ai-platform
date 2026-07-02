import sys
import os
import pandas as pd

BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../..")
)

sys.path.append(BASE_DIR)

from app.database.db import SessionLocal
from app.database.models import DatasetSample

CSV_PATH = os.path.join(
    BASE_DIR,
    "ml-training",
    "dataset",
    "features.csv"
)

print("Loading CSV from:", CSV_PATH)


def migrate():
    db = SessionLocal()

    df = pd.read_csv(CSV_PATH)

    print(f"Rows found: {len(df)}")

    for i, row in df.iterrows():
        sample = DatasetSample(
            image="migrated.jpg",
            height=float(row["height"]),
            gender=row.get("gender", "unknown"),
            age=int(row.get("age", 0)),
            weight=float(row.get("weight", 0)),
            camera_distance=float(row.get("camera_distance", 0))
        )

        db.add(sample)

        print(f"Inserted row {i + 1}")

    db.commit()
    db.close()

    print("Migration completed successfully")


if __name__ == "__main__":
    migrate()