import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequirementContainer from './RequirementContainer';
import './requirementDetail.css';

const RequirementDetail = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();
    const [requerimiento, setRequerimiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate('/requirements');
    };

    // Renderiza el mensaje de carga
    if (loading) {
        return (
            <div>
                <RequirementContainer 
                    codigo={codigo} 
                    setRequerimiento={setRequerimiento} 
                    setLoading={setLoading} 
                    setError={setError} 
                />
                <p>Cargando...</p>
            </div>
        );
    }

    // Muestra el mensaje de error
    if (error) {
        return (
            <div>
                <RequirementContainer 
                    codigo={codigo} 
                    setRequerimiento={setRequerimiento} 
                    setLoading={setLoading} 
                    setError={setError} 
                />
                <p>Error: {error}</p>
            </div>
        );
    }

    // Si no hay requerimiento después de cargar, muestra mensaje
    if (!requerimiento) {
        return (
            <div>
                <RequirementContainer 
                    codigo={codigo} 
                    setRequerimiento={setRequerimiento} 
                    setLoading={setLoading} 
                    setError={setError} 
                />
                <p>Requerimiento no encontrado</p>
            </div>
        );
    }

    return (
        <div className="requirement-detail-container">
            <div className="requirement-detail-header">
                <h1>Detalle Requerimiento: {codigo}</h1>
            </div>
            
            <div className="requirement-detail-content">
                <p><strong>Asunto:</strong> {requerimiento.asunto}</p>
                <p><strong>Descripción:</strong> {requerimiento.descripcion}</p>
                <p><strong>Estado:</strong> {requerimiento.estado}</p>
                <p><strong>Emisor:</strong> {requerimiento.emisor}</p>
                <p><strong>Propietario:</strong> {requerimiento.propietario}</p>
                <p><strong>Prioridad:</strong> {requerimiento.prioridad}</p>
                <p><strong>Tipo:</strong> {requerimiento.tipo}</p>
                <p><strong>Categoría:</strong> {requerimiento.categoria}</p>
                <p><strong>Fecha de Alta:</strong> {requerimiento.fechaCreacion}</p>
                <p><strong>Última Actualización:</strong> {requerimiento.fechaActualizacion}</p>
            </div>
            
            <div className="comment-container">
                <h3>Comentarios:</h3>
            </div>
          
            <div className="comment-detail-content">
                <p><strong>Asunto:</strong> {requerimiento.asunto}</p>
                <p><strong>Descripción:</strong> {requerimiento.descripcion}</p>
                <p><strong>Fecha:</strong> {requerimiento.fechaActualizacion}</p>
                <p><strong>Emisor:</strong> {requerimiento.emisor}</p>
            </div>
            
            <div className="button-detail-content">
            <button onClick={handleBack} className="back-button">
                ← Volver
            </button>
            </div>

        </div>
    );
};

export default RequirementDetail;