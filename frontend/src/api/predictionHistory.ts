import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
});

export async function getPredictionHistory() {
    const response = await API.get("/prediction/list");
    return response.data.predictions;
}