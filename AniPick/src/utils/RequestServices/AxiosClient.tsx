/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";

const localApiUrl = "https://localhost:44324";
//const productionApiUrl = "https://anipickapi.azurewebsites.net/";

export const axiosClient = axios.create({
    baseURL: localApiUrl,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    },
    withCredentials: true,
});