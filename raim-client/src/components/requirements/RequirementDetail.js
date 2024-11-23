// src/components/requirements/RequirementDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RequirementDetail = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/requirements');
    };

    return (
        <div className="requirement-detail-container">
            <div className="requirement-detail-header">
                <button onClick={handleBack} className="back-button">
                    ← Volver
                </button>
                <h1>Detalle Requerimiento {codigo}</h1>
            </div>
            
            <div className="requirement-detail-content">
                <p>Información detallada del requerimiento {codigo} será mostrada próximamente.</p>
            </div>
        </div>
    );
};

export default RequirementDetail;