import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react';
import LoadingPage from "../LoadingPage/LoadingPage";
import { useAuthStore } from '../../utils/contextStore/authStore';

const AddAnime = lazy(() => import('../../pages/MainPage/AddAnime/AddAnime'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const RegisterForm = lazy(() => import('../../pages/Registration/Registration'));
const LoginForm = lazy(() => import('../../pages/Login/Login'));
const UserPanel = lazy(() => import('../../pages/UserPanel/UserPanel'));

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
                <Route path="/" element={<Suspense fallback={<LoadingPage />}><MainPage /></Suspense>} />
                <Route path="/add-anime" element={
                    <Suspense fallback={<LoadingPage />}>
                        <ProtectedRoute>
                            <AddAnime />
                        </ProtectedRoute>
                    </Suspense>
                } />
                <Route path="/mainPage" element={<Suspense fallback={<LoadingPage />}><MainPage /></Suspense>} />
                <Route path="/login" element={<Suspense fallback={<LoadingPage />}><LoginForm /></Suspense>} />
                <Route path="/register" element={<Suspense fallback={<LoadingPage />}><RegisterForm /></Suspense>} />
                <Route path="/userPanel" element={
                    <Suspense fallback={<LoadingPage />}>
                        <ProtectedRoute>
                            <UserPanel />
                        </ProtectedRoute>
                    </Suspense>
                } />
            </Routes>
        </BrowserRouter>
    );
}