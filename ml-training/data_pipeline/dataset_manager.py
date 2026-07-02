import sqlite3
import os


DATABASE_PATH = "dataset/human_height.db"


class DatasetManager:


    def __init__(self):

        os.makedirs(
            "dataset",
            exist_ok=True
        )

        self.connection = sqlite3.connect(
            DATABASE_PATH
        )

        self.create_table()



    def create_table(self):

        cursor = self.connection.cursor()


        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS people(

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                image_path TEXT UNIQUE NOT NULL,

                height REAL NOT NULL,

                processed INTEGER DEFAULT 0

            )
            """
        )


        self.connection.commit()



    def clear_dataset(self):

        cursor = self.connection.cursor()


        cursor.execute(
            """
            DELETE FROM people
            """
        )


        self.connection.commit()



    def add_person(
        self,
        image_path,
        height
    ):

        cursor = self.connection.cursor()


        try:

            cursor.execute(
                """
                INSERT INTO people
                (
                    image_path,
                    height
                )

                VALUES (?,?)
                """,

                (
                    image_path,
                    height
                )
            )


            self.connection.commit()


            print(
                f"Added: {image_path}"
            )


            return cursor.lastrowid



        except sqlite3.IntegrityError:


            cursor.execute(
                """
                SELECT id
                FROM people
                WHERE image_path = ?
                """,

                (
                    image_path,
                )
            )


            existing = cursor.fetchone()


            print(
                f"Duplicate skipped: {image_path}"
            )


            return existing[0]



    def get_all_people(self):

        cursor = self.connection.cursor()


        cursor.execute(
            """
            SELECT
                id,
                image_path,
                height,
                processed

            FROM people

            ORDER BY id
            """
        )


        return cursor.fetchall()



    def mark_processed(
        self,
        person_id
    ):

        cursor = self.connection.cursor()


        cursor.execute(
            """
            UPDATE people

            SET processed = 1

            WHERE id = ?
            """,

            (
                person_id,
            )
        )


        self.connection.commit()



    def close(self):

        self.connection.close()



if __name__ == "__main__":


    manager = DatasetManager()


    manager.add_person(
        "dataset/raw/person.jpeg",
        175
    )


    print(
        manager.get_all_people()
    )


    manager.close()