import { DATASET_API } from "./api";

export const getSettings = async () => {

    const response = await DATASET_API.get("/settings");

    return response.data;

};

export const saveSettings = async (settings: any) => {

    const response = await DATASET_API.post(

        "/settings",

        settings

    );

    return response.data;

};