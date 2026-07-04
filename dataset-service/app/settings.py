import json
import os

from fastapi import APIRouter

router = APIRouter()

SETTINGS_FILE = "app/config/settings.json"


@router.get("/settings")
def get_settings():

    if not os.path.exists(SETTINGS_FILE):

        return {
            "error": "Settings file not found"
        }

    with open(SETTINGS_FILE, "r") as file:

        return json.load(file)


@router.post("/settings")
def save_settings(settings: dict):

    with open(SETTINGS_FILE, "w") as file:

        json.dump(
            settings,
            file,
            indent=4
        )

    return {
        "success": True,
        "message": "Settings updated successfully"
    }