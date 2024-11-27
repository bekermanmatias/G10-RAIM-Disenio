// src/context/authContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token, user) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.setItem('isAuthenticated', 'false');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};