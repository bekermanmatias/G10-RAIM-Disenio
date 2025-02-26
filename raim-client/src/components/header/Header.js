import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';

const Header = ({ toggleSidebar }) => {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/requirements"> 
                    <img src="/assets/icons/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
            <button className="hamburger-menu" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
};

export default Header;
