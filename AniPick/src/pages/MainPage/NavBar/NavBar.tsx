import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath, LinkProps, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, Button, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Style from "./NavBar.module.css"; // Ensure this CSS module is applied
import { useAuthStore } from '../../../utils/contextStore/authStore';

interface CustomLinkProps extends LinkProps {
    children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
    return (
        <ListItem 
            button 
            component={Link} 
            to={to} 
            {...props} 
            className={`${isActive ? Style.active : ""} ${Style.navLink}`}>
            {children}
        </ListItem>
    );
};

export default function NavBar() {
    const { isLoggedIn, logout, user, checkAuth } = useAuthStore();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const initAuth = async () => {
            if (user != null) {
                await checkAuth(user.id);
            }
        };
        void initAuth();
    }, [checkAuth, user]);

    const hasAddAnimeClaim = user?.userClaims?.some(claim => claim.id === 1 || claim.id === 2);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const drawerContent = (
        <List>
            <CustomLink to="/mainPage">Pick Anime</CustomLink>
            {isLoggedIn && hasAddAnimeClaim && <CustomLink to="/add-anime">Add Anime</CustomLink>}
            {!isLoggedIn && (
                <>
                    <CustomLink to="/login">Login</CustomLink>
                    <CustomLink to="/register">Register</CustomLink>
                </>
            )}
            <CustomLink to="/allOpenings">All Openings</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            {isLoggedIn && (
                <>
                    <CustomLink to="/userPanel">UserPanel</CustomLink>
                    <CustomLink to="/login" onClick={handleLogout}>Logout</CustomLink>
                </>
            )}
        </List>
    );

    return (
        <AppBar 
            position="relative" 
            sx={{ background: "#191919", boxShadow: "0 0.5rem 1rem rgba(0,0,0,.175)", zIndex: 300 }}
        >
            <Toolbar className={Style.nav}>
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/mainPage" 
                    className={Style.siteTitle} 
                    sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
                >
                    AniPick
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            aria-label="menu" 
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer 
                            anchor="right" 
                            open={drawerOpen} 
                            onClose={toggleDrawer(false)}
                        >
                            {drawerContent}
                        </Drawer>
                    </>
                ) : (
                    <div className={Style.navLinks}>
                        <Button 
                            color="inherit" 
                            component={Link} 
                            to="/mainPage" 
                            className={Style.navLink}
                        >
                            Pick Anime
                        </Button>
                        {isLoggedIn && hasAddAnimeClaim && (
                            <Button 
                                color="inherit" 
                                component={Link} 
                                to="/add-anime" 
                                className={Style.navLink}
                            >
                                Add Anime
                            </Button>
                        )}
                        {!isLoggedIn && (
                            <>
                                <Button 
                                    color="inherit" 
                                    component={Link} 
                                    to="/login" 
                                    className={Style.navLink}
                                >
                                    Login
                                </Button>
                                <Button 
                                    color="inherit" 
                                    component={Link} 
                                    to="/register" 
                                    className={Style.navLink}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                        <Button 
                            color="inherit" 
                            component={Link} 
                            to="/allOpenings" 
                            className={Style.navLink}
                        >
                            All Openings
                        </Button>
                        <Button 
                            color="inherit" 
                            component={Link} 
                            to="/about" 
                            className={Style.navLink}
                        >
                            About
                        </Button>
                        {isLoggedIn && (
                            <>
                                <Button 
                                    color="inherit" 
                                    component={Link} 
                                    to="/userPanel" 
                                    className={Style.navLink}
                                >
                                    UserPanel
                                </Button>
                                <Button 
                                    color="inherit" 
                                    onClick={handleLogout} 
                                    className={Style.navLink}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}