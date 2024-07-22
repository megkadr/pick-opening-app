/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";

const localApiUrl = "https://localhost:44324";
const productionApiUrl = "https://localhost:44324";

export const axiosClient = axios.create({
    baseURL: import.meta.env.DEV ? localApiUrl : productionApiUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});