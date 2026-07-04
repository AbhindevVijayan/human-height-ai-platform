import { AI_API } from "./api";

export async function trainModel() {

    return AI_API.post("/train");

}

export async function reloadModel() {

    return AI_API.post("/model/reload");

}
import axios from "axios";

const TRAINING_API = axios.create({
    baseURL: "http://localhost:8001",
});

export const startTraining = async () => {
    const response = await TRAINING_API.post("/training/start");
    return response.data;
};