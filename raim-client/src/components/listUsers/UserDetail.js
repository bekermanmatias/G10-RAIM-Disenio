// src/components/users/UserDetail.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContainer from './UserContainer';
import './UserDetail.css';

const UserDetail = () => {
    const { nombreUsuario } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate('/users');
    };

    // Manejo de estados de carga y error
    if (loading) {
        return (
            <div className="user-detail-container">
                <UserContainer 
                    nombreUsuario={nombreUsuario}
                    setUsuario={setUsuario}
                    setLoading={setLoading}
                    setError={setError}
                />
                <p>Cargando detalles del usuario...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-detail-container">
                <UserContainer 
                    nombreUsuario={nombreUsuario}
                    setUsuario={setUsuario}
                    setLoading={setLoading}
                    setError={setError}
                />
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!usuario) {
        return (
            <div className="user-detail-container">
                <UserContainer 
                    nombreUsuario={nombreUsuario}
                    setUsuario={setUsuario}
                    setLoading={setLoading}
                    setError={setError}
                />
                <p>Usuario no encontrado</p>
            </div>
        );
    }

    return (
        <div className="user-detail-container">
            <UserContainer 
                nombreUsuario={nombreUsuario}
                setUsuario={setUsuario}
                setLoading={setLoading}
                setError={setError}
            />
            <div className="user-detail-header">
                <h1>Detalles de Usuario</h1>
            </div>
            
            <div className="user-detail-content">
                <div className="user-detail-section">
                    <h2>Información Personal</h2>
                    <p><strong>Nombre Completo:</strong> {usuario.nombreCompleto}</p>
                    <p><strong>Legajo:</strong> {usuario.legajo}</p>
                    <p><strong>Usuario:</strong> {usuario.usuario}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                </div>

                <div className="user-detail-section">
                    <h2>Información Laboral</h2>
                    <p><strong>Cargo:</strong> {usuario.cargo}</p>
                    <p><strong>Departamento:</strong> {usuario.departamento}</p>
                    <p><strong>Fecha de Ingreso:</strong> {usuario.fechaIngreso}</p>
                </div>
                <button onClick={handleBack} className="back-button">
                    ← Volver
                </button>
            </div>
        </div>
    );
};

export default UserDetail;
