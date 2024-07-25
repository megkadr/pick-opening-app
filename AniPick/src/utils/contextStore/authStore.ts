import { create } from 'zustand'
import { User } from '../../assets/DTO/User'

interface AuthState {
    isLoggedIn: boolean
    user: User | null
    login: (userData: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: null,
    login: (userData: User) => set({ isLoggedIn: true, user: userData }),
    logout: () => set({ isLoggedIn: false, user: null }),
}))