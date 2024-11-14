// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');  // Clear the authentication flag
        navigate('/login');  // Redirect to login page
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <img src="./legal-black.png" alt="Logo" className="logo" />
                <Link to="/" className="nav-title">Legal Minds</Link>
            </div>
            <div className="nav-right">
                <Link to="/home">Home</Link>
                <Link to="/new">Analyse</Link>
                <Link to="/history">History</Link>
                <Link to="/about">About Us</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout button */}
            </div>
        </nav>
    );
};

export default Navbar;
