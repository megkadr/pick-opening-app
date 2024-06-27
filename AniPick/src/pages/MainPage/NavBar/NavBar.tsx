import {Link, useMatch, useResolvedPath} from "react-router-dom";
import Style from "./NavBar.module.css"

export default function NavBar() {
    return (
        <header>
            <nav className={Style.nav}>
                <Link to="/mainPage" className={Style.siteTitle}>AniPick</Link>
                <ul>
                    <CustomLink to="/mainPage">PICK</CustomLink>
                    <CustomLink to="/login">Login</CustomLink>
                    <CustomLink to="/register">Register</CustomLink>
                    <CustomLink to="/userPanel">UserPanel</CustomLink>
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