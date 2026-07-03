import { AI_API, DATASET_API } from "./api";

export async function getPredictionHistory() {
    const response = await DATASET_API.get("/prediction/list");
    return response.data.predictions;
}

export async function predictHeight(
    image: File,
    age: string,
    weight: string,
    gender: string,
    cameraDistance: string
) {

    const formData = new FormData();

    formData.append("image", image);
    formData.append("age", age);
    formData.append("weight", weight);
    formData.append("gender", gender);
    formData.append("camera_distance", cameraDistance);

    const response = await AI_API.post(
        "/predict",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}

export async function savePrediction(data: any) {

    return DATASET_API.post(
        "/prediction/save",
        data
    );

}