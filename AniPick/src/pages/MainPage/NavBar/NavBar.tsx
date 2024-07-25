import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Style from "./NavBar.module.css"
import { useAuthStore } from '../.././../utils/contextStore/authStore';

export default function NavBar() {
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const logout = useAuthStore(state => state.logout);
    const user = useAuthStore(state => state.user);
    console.log("user", user);
    const hasAddAnimeClaim = user?.userClaims?.some(claim => claim.id === 1 || claim.id === 2);

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
                    {isLoggedIn && (
                        <>
                            <CustomLink to="/userPanel">UserPanel</CustomLink>
                            <CustomLink to="/login" onClick={() => logout()}>Logout</CustomLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}