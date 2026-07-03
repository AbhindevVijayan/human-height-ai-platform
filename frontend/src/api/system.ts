import { AI_API } from "./api";

export async function getSystemHealth() {

    const response = await AI_API.get("/health");

    return response.data;

}