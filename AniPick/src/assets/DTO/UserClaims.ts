
import { Claim } from "./Claim";
import { User } from "./User";

export interface UserClaims{
    userId: number;
    claimId: number;
    user: User;
    claim: Claim;
}