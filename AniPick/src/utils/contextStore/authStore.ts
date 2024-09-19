import { create } from 'zustand'
import { User } from '../../assets/DTO/User'
import { isAuthenticated } from "../RequestServices/UserService";
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean
    user: User | null
    login: (userData: User) => void
    logout: () => void
    checkAuth: (userId: number) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            login: (userData: User) => {
                set({ isLoggedIn: true, user: userData })
            },
            logout: () => {
                set({ isLoggedIn: false, user: null })
            },
            checkAuth: async (userId: number) => {
                try {
                    const isLoggedInResult = await isAuthenticated(userId)
                    if (isLoggedInResult) {
                        // If the server confirms authentication, maintain the current state
                        set((state) => ({ isLoggedIn: true, user: state.user }))
                    } else {
                        // If server rejects, clear the state
                        set({ isLoggedIn: false, user: null })
                    }
                } catch (error) {
                    console.error('Auth check failed:', error)
                    set({ isLoggedIn: false, user: null })
                }
            },
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
        }
    )
)