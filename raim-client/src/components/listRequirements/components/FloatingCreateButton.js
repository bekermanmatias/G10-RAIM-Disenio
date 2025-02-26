// src/components/listRequirements/components/FloatingCreateButton.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FloatingCreateButton.css';

const FloatingCreateButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const shouldShowButton = ['/requirements', '/'].includes(location.pathname);

    const handleCreateClick = () => {
        navigate('/crear-requerimiento');
    };

    if (!shouldShowButton) return null;

    return (
        <button
            className="floating-create-button"
            onClick={handleCreateClick}
        >
            <img src="/assets/icons/mas.svg" alt="Agregar" className="plus-icon" />
            Crear
        </button>
    );
};

export default FloatingCreateButton;