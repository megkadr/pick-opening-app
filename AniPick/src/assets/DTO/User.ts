import { Claim } from "./Claim";
import { Opening } from "./Opening";

export interface User {
    id: number
    name: string;
    passwordHash: string;
    email: string;
    userOpenings: Opening[];
    userClaims: Claim[];
}