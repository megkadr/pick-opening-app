import {BrowserRouter, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from 'react';
import LoadingPage from "../LoadingPage/LoadingPage";

const AddAnime = lazy(() => import('../../pages/MainPage/AddAnime/AddAnime'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const RegisterForm = lazy(() => import('../../pages/Registration/Registration'));
const LoginForm = lazy(() => import('../../pages/Login/Login'));
const UserPanel = lazy(() => import('../../pages/UserPanel/UserPanel'));

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Suspense fallback={<LoadingPage />}><MainPage /></Suspense>} />
                <Route path="/add-anime" element={<Suspense fallback={<LoadingPage />}><AddAnime /></Suspense>} />
                <Route path="/mainPage" element={<Suspense fallback={<LoadingPage />}><MainPage /></Suspense>} />
                <Route path="/login" element={<Suspense fallback={<LoadingPage />}><LoginForm /></Suspense>} />
                <Route path="/register" element={<Suspense fallback={<LoadingPage />}><RegisterForm /></Suspense>} />
                <Route path="/userPanel" element={<Suspense fallback={<LoadingPage />}><UserPanel /></Suspense>} />
            </Routes>
        </BrowserRouter>
    );
}