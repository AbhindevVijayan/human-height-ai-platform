import { DATASET_API } from "./api";

export async function getHistory() {

    const response = await DATASET_API.get(
        "/prediction/list"
    );

    return response.data;

}