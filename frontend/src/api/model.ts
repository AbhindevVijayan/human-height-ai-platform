import { AI_API } from "./api";

export async function getModelInfo() {

    const response = await AI_API.get("/model/info");

    return response.data;

}

export async function trainModel() {

    const response = await AI_API.post("/train");

    return response.data;

}

export async function reloadModel() {

    const response = await AI_API.post("/model/reload");

    return response.data;

}