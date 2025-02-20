import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout, isOpen }) => {
    const location = useLocation();

    return (
        <nav className={`sidebar ${isOpen ? 'active' : ''}`}>
            <ul>
                <li>
                    <Link 
                        to="/requirements" 
                        className={`sidebar-link ${location.pathname.startsWith('/requirements') ? 'active' : ''}`}
                    >
                        Requerimientos
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/users" 
                        className={`sidebar-link ${location.pathname.startsWith('/users') ? 'active' : ''}`}
                    >
                        Usuarios
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/settings" 
                        className={`sidebar-link ${location.pathname.startsWith('/settings') ? 'active' : ''}`}
                    >
                        Configuración
                    </Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default Sidebar;