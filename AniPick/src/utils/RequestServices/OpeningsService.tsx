/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Opening } from "../../assets/DTO/Opening";
import { OpeningsByYear } from "../../assets/DTO/OpeningsByYear";
import { axiosClient } from "./AxiosClient";

export async function addAnimeOpening(request: Opening) {
    return await axiosClient.post("/Openings/opening", request);
}

export async function getOpeningsByYear(year: number): Promise<Opening[]> {
    const response = await axiosClient.get<Opening[]>(`/Openings/openings?year=${year}`);
    return response.data
}

export async function getAllOpenings(): Promise<OpeningsByYear[]> {
    const response = await axiosClient.get<OpeningsByYear[]>(`/Openings/allOpenings`);
    return response.data
}