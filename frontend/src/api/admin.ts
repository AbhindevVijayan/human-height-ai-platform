import axios from "axios";

const ADMIN_API = axios.create({
    baseURL: "http://localhost:8000",
});

export async function adminLogin(username: string, password: string) {

    const response = await ADMIN_API.post("/admin/login", {

        username,
        password

    });

    return response.data;
}