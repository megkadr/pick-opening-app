import React, { useEffect } from "react";
import { Link, useMatch, useResolvedPath, LinkProps, useNavigate } from "react-router-dom";
import Style from "./NavBar.module.css";
import { useAuthStore } from '../../../utils/contextStore/authStore';

interface CustomLinkProps extends LinkProps {
    children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? Style.active : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
};

export default function NavBar() {
    const { isLoggedIn, logout, user, checkAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            console.log('Initializing auth...');
            if(user != null){
                await checkAuth(user.id);
                console.log('Auth initialized. isLoggedIn:', useAuthStore.getState().isLoggedIn);
            }
        };
        void initAuth();
    }, [checkAuth, user]);

    useEffect(() => {
        console.log('Auth state changed. isLoggedIn:', isLoggedIn, 'user:', user);
    }, [isLoggedIn, user]);

    const hasAddAnimeClaim = user?.userClaims?.some(claim => claim.id === 1 || claim.id === 2);

    const handleLogout = () => {
        console.log('Logging out...');
        logout();
        navigate('/login');
    };

    return (
        <header className={Style.header}>
            <nav className={Style.nav}>
                <Link to="/mainPage" className={Style.siteTitle}>AniPick</Link>
                <ul>
                    <CustomLink to="/mainPage">Pick Anime</CustomLink>
                    {isLoggedIn && hasAddAnimeClaim && <CustomLink to="/add-anime">Add Anime</CustomLink>}
                    {!isLoggedIn && (
                        <>
                            <CustomLink to="/login">Login</CustomLink>
                            <CustomLink to="/register">Register</CustomLink>
                        </>
                    )}
                    <CustomLink to="/about">About</CustomLink>
                    {isLoggedIn && (
                        <>
                            <CustomLink to="/userPanel">UserPanel</CustomLink>
                            <CustomLink to="/login" onClick={handleLogout}>Logout</CustomLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}