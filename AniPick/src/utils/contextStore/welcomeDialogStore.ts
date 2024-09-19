import create from 'zustand';

interface WelcomeDialogState {
    isWelcomeDialogOpen: boolean;
    closeWelcomeDialog: () => void;
    checkAndShowWelcomeDialog: () => void;
}

export const useWelcomeDialogStore = create<WelcomeDialogState>((set) => ({
    isWelcomeDialogOpen: false,
    closeWelcomeDialog: () => set({ isWelcomeDialogOpen: false }),
    checkAndShowWelcomeDialog: () => {
        const hasSeenMessage = localStorage.getItem('hasSeenWelcomeMessage');
        if (!hasSeenMessage) {
        set({ isWelcomeDialogOpen: true });
        localStorage.setItem('hasSeenWelcomeMessage', 'true');
        }
    },
}));