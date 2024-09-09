import { useState,useEffect } from "react";
import { NavLink,useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation(); // Hook to get the current location

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);
    // Close menu when the route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">CourseHub</NavLink>
                    </div>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        &#9776; {/* Hamburger icon */}
                    </button>
                    <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            {isLoggedIn ? (
                                <li><NavLink to="/logout">Logout</NavLink></li>
                            ) : (
                                <>
                                    <li><NavLink to="/register">SignUp</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
