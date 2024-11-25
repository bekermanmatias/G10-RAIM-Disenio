import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/requirements"> 
                    <img src="/assets/icons/logo.svg" alt="Logo" className="logo" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
