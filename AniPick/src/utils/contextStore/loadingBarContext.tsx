import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoadingBar from 'react-top-loading-bar';

interface LoadingBarContextType {
    setProgress: (progress: number) => void;
    resetProgress: () => void;
}

const LoadingBarContext = createContext<LoadingBarContextType | undefined>(undefined);

export const LoadingBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState(0);

    const resetProgress = () => setProgress(0);

    return (
        <LoadingBarContext.Provider value={{ setProgress, resetProgress }}>
            <LoadingBar color="#f11946" progress={progress} onLoaderFinished={resetProgress} />
            {children}
        </LoadingBarContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoadingBar = () => {
    const context = useContext(LoadingBarContext);
    if (!context) {
        throw new Error('useLoadingBar must be used within a LoadingBarProvider');
    }
    return context;
};