import { DATASET_API } from "./api";

export const getDataset = async () => {

    const response = await DATASET_API.get("/dataset/list");

    return response.data.samples;

};

export const uploadDataset = async (formData: FormData) => {

    const response = await DATASET_API.post(

        "/dataset/upload",

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

    );

    return response.data;

};

export const deleteDataset = async (id: number) => {

    const response = await DATASET_API.delete(`/dataset/${id}`);

    return response.data;

};