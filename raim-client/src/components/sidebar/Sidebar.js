import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <ul>
                <li><Link to="/requirements">Requerimientos</Link></li>
                <li><Link to="/users">Usuarios</Link></li>
                <li><Link to="/settings">Configuración</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;