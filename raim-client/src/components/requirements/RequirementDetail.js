// src/components/requirements/RequirementDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requerimientosData } from '../listRequirements/Requirements';

const RequirementDetail = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/requirements');
    };

    const requerimiento = requerimientosData.find(req => req.codigo === codigo);

    if (!requerimiento) {
        return <p>Requerimiento no encontrado</p>;
    }
    
    return (
        <div className="requirement-detail-container">
            <div className="requirement-detail-header">
                <button onClick={handleBack} className="back-button">
                    ← Volver
                </button>
                <h1>Detalle Requerimiento {codigo}</h1>
            </div>
            
            <div className="requirement-detail-content">
                <p>Información detallada del requerimiento {codigo}.</p>
                <p><strong>Código:</strong> {requerimiento.codigo}</p>
                <p><strong>Asunto:</strong> {requerimiento.asunto}</p>
                <p><strong>Estado:</strong> {requerimiento.estado}</p>
                <p><strong>Propietario:</strong> {requerimiento.propietario}</p>
                {/* Muestra otros detalles */}
            </div>
        </div>
    );
};

export default RequirementDetail;