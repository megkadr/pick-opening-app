/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Opening } from "../../assets/DTO/Opening";
import { axiosClient } from "./AxiosClient";

export async function addAnimeOpening(request: Opening) {
    return await axiosClient.post("/Openings/opening", request);
}