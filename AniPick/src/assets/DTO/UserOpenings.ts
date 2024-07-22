import { User } from "./User";
import { Opening } from "./Opening";

export interface UserOpenings {
    userId: number;
    openingId: number;
    year: number;
    user: User;
    opening: Opening;
}