import axios from "axios";

export const AI_API = axios.create({
    baseURL: "http://localhost:9000",
});

export const DATASET_API = axios.create({
    baseURL: "http://localhost:8000",
});