import React from 'react';
import logo from '../assets/images/logo.svg'; 
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        </header>
    );
};

export default Header;