import { DATASET_API } from "./api";

export async function registerUser(data: {
    full_name: string;
    email: string;
    password: string;
}) {

    const response = await DATASET_API.post(
        "/auth/register",
        data
    );

    return response.data;
}

export async function loginUser(data: {
    email: string;
    password: string;
}) {

    const response = await DATASET_API.post(
        "/auth/login",
        data
    );

    return response.data;
}