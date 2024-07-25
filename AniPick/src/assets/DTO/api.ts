import { User } from './User';

export interface LoginResponse {
    isAuthenticated: boolean;
    user: User | null;
}