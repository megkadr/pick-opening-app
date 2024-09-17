/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import AccountDetailsModel from "../../assets/DTO/AccountDetailsModel";
import { User } from "../../assets/DTO/User";
import { UserOpeningModel } from "../../assets/DTO/UserOpeningModel";
import { axiosClient } from "./AxiosClient";

export async function addUser(request: User) {
    return await axiosClient.post("/Users/user/register", request);
}

export async function login(request: {login: string, password: string}): Promise<User> {
    const params = {
        login: request.login,
        password: request.password
    }
    const response = await axiosClient.get<User>("/Users/login", {params});
    return response.data;
}

export async function addUserOpening(request: UserOpeningModel) {
    return await axiosClient.post("/Users/opening", request);
}

export async function removeUser(id: number) {
    return await axiosClient.delete(`/Users/user/${id}`);
}

export async function changeUserPassword(id: number) {
    return await axiosClient.put(`/Users/user/password/${id}`);
}

export async function getUserAccountDetails(userId: number) {
    return await axiosClient.get<AccountDetailsModel>(`/Users/user/accountDetails?userId=${userId}`);
}

export async function changePassword(request: {userId: number, currentPassword: string, newPassword: string}) {
    const params = {
        userId: request.userId,
        currentPassword: request.currentPassword,
        newPassword: request.newPassword
    }
    const response = await axiosClient.get("/Users/changePassword", {params});
    return response;
}