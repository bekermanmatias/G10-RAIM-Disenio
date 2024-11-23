import React from 'react';
import { useParams } from 'react-router-dom';
import { requerimientosData } from '../../listRequirements/Requirements';

const VisualizeRequirements = () => {
    const { codigo } = useParams();

    const requerimiento = requerimientosData.find(req => req.codigo === codigo);

    if (!requerimiento) {
        return <p>Requerimiento no encontrado</p>;
    }

    return (
        <div>
            <h1>Detalle del Requerimiento</h1>
            <p><strong>Código:</strong> {requerimiento.codigo}</p>
            <p><strong>Asunto:</strong> {requerimiento.asunto}</p>
            <p><strong>Estado:</strong> {requerimiento.estado}</p>
            <p><strong>Propietario:</strong> {requerimiento.propietario}</p>
            {/* Muestra otros detalles */}
            <button onClick={() => window.history.back()}>↩ Regresar</button>
        </div>
    );
};

export default VisualizeRequirements;
