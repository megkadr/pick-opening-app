import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { useAuthStore } from '../../utils/contextStore/authStore';
import { useLoadingBar } from '../../utils/contextStore/loadingBarContext';

const AddAnime = lazy(() => import('../../pages/MainPage/AddAnime/AddAnime'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const RegisterForm = lazy(() => import('../../pages/Registration/Registration'));
const LoginForm = lazy(() => import('../../pages/Login/Login'));
const UserPanel = lazy(() => import('../../pages/UserPanel/UserPanel'));
const About = lazy(() => import('../../pages/About/About'));
const AllOpenings = lazy(() => import('../../pages/AllOpenings/AllOpenings'));

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

const RouteChangeHandler: React.FC = () => {
    const { pathname } = useLocation();
    const { setProgress } = useLoadingBar();
    useEffect(() => {
        setProgress(30);
        const timeout = setTimeout(() => setProgress(100), 300);
        return () => clearTimeout(timeout);
    }, [pathname, setProgress]);
    return null;
};

const AuthChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const checkAuth = useAuthStore(state => state.checkAuth);
    const user = useAuthStore(state => state.user);

    useEffect(() => {
        if (user === null) return;
        void checkAuth(user.id);
    }, [checkAuth, user]);

    return <>{children}</>;
};

export default function Router() {
    return (
        <BrowserRouter>
            <AuthChecker>
                <RouteChangeHandler />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={null}>
                                <MainPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/add-anime"
                        element={
                            <Suspense fallback={null}>
                                <ProtectedRoute>
                                    <AddAnime />
                                </ProtectedRoute>
                            </Suspense>
                        }
                    />
                    <Route
                        path="/mainPage"
                        element={
                            <Suspense fallback={null}>
                                <MainPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={null}>
                                <LoginForm />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={null}>
                                <RegisterForm />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/userPanel"
                        element={
                            <Suspense fallback={null}>
                                <ProtectedRoute>
                                    <UserPanel />
                                </ProtectedRoute>
                            </Suspense>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <Suspense fallback={null}>
                                <About />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/allOpenings"
                        element={
                            <Suspense fallback={null}>
                                <AllOpenings />
                            </Suspense>
                        }
                    />
                </Routes>
            </AuthChecker>
        </BrowserRouter>
    );
}