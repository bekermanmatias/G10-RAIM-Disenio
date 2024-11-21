import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="/assets/icons/logo.svg" alt="Logo" className="logo" />
            </div>
        </header>
    );
};

export default Header;
