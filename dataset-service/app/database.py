import sqlite3
import os
import hashlib
from datetime import datetime


DATABASE_PATH = "dataset_service.db"


def get_connection():

    return sqlite3.connect(
        DATABASE_PATH
    )



def create_tables():

    conn = get_connection()
    cursor = conn.cursor()


    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS samples(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            image_path TEXT UNIQUE NOT NULL,

            image_hash TEXT UNIQUE NOT NULL,

            height REAL NOT NULL,

            gender TEXT,

            age INTEGER,

            weight REAL,

            camera_distance REAL,

            created_at TEXT

        )
        """
    )


    conn.commit()
    conn.close()



def calculate_hash(file_path):

    sha = hashlib.sha256()

    with open(file_path, "rb") as file:

        while chunk := file.read(8192):

            sha.update(chunk)


    return sha.hexdigest()



def add_sample(
    image_path,
    height,
    gender=None,
    age=None,
    weight=None,
    camera_distance=None
):

    image_path = image_path.replace("\\", "/")


    image_hash = calculate_hash(
        image_path
    )


    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute(
        """
        SELECT id 
        FROM samples
        WHERE image_hash=?
        """,
        (image_hash,)
    )


    existing = cursor.fetchone()


    if existing:

        conn.close()

        return existing[0]



    cursor.execute(
        """
        INSERT INTO samples
        (
            image_path,
            image_hash,
            height,
            gender,
            age,
            weight,
            camera_distance,
            created_at
        )

        VALUES (?,?,?,?,?,?,?,?)
        """,
        (
            image_path,
            image_hash,
            height,
            gender,
            age,
            weight,
            camera_distance,
            datetime.now().isoformat()
        )
    )


    sample_id = cursor.lastrowid


    conn.commit()
    conn.close()


    return sample_id



def get_samples():

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute(
        """
        SELECT
        id,
        image_path,
        height,
        gender,
        age,
        weight,
        camera_distance,
        created_at

        FROM samples
        """
    )


    rows = cursor.fetchall()


    conn.close()


    result = []


    for row in rows:

        result.append({

            "id": row[0],
            "image": row[1],
            "height": row[2],
            "gender": row[3],
            "age": row[4],
            "weight": row[5],
            "camera_distance": row[6],
            "created_at": row[7]

        })


    return result



create_tables()