from app.database import (
    add_sample,
    get_samples
)


sample_id = add_sample(
    "app/storage/person.jpeg",
    175
)


print(
    "Inserted ID:",
    sample_id
)


print(
    get_samples()
)