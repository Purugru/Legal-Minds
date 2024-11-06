import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
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
            </div>
        </nav>
    );
};

export default Navbar;
