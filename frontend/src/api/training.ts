import { AI_API } from "./api";

export async function trainModel() {

    return AI_API.post("/train");

}

export async function reloadModel() {

    return AI_API.post("/model/reload");

}