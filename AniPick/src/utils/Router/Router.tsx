import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useAuthStore } from '../../utils/contextStore/authStore';

const AddAnime = lazy(() => import('../../pages/MainPage/AddAnime/AddAnime'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const RegisterForm = lazy(() => import('../../pages/Registration/Registration'));
const LoginForm = lazy(() => import('../../pages/Login/Login'));
const UserPanel = lazy(() => import('../../pages/UserPanel/UserPanel'));

const LoadingSpinner = () => (
    <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    bgcolor="rgba(182, 182, 182, 0.4)"
    >
    <CircularProgress size={60} />
    </Box>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const user = useAuthStore(state => state.user);
    const hasAddAnimeClaim = user?.userClaims?.some(claim => claim.id === 1 || claim.id === 2);
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    if (hasAddAnimeClaim && !isLoggedIn) {
        return <Navigate to="/mainPage" replace />;
    }
    return <>{children}</>;
};

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Suspense fallback={<LoadingSpinner />}><MainPage /></Suspense>} />
                <Route path="/add-anime" element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <ProtectedRoute>
                            <AddAnime />
                        </ProtectedRoute>
                    </Suspense>
                } />
                <Route path="/mainPage" element={<Suspense fallback={<LoadingSpinner />}><MainPage /></Suspense>} />
                <Route path="/login" element={<Suspense fallback={<LoadingSpinner />}><LoginForm /></Suspense>} />
                <Route path="/register" element={<Suspense fallback={<LoadingSpinner />}><RegisterForm /></Suspense>} />
                <Route path="/userPanel" element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <ProtectedRoute>
                            <UserPanel />
                        </ProtectedRoute>
                    </Suspense>
                } />
            </Routes>
        </BrowserRouter>
    );
}