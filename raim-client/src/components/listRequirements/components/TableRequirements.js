// src/components/listRequirements/components/TableRequirements.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TableRequirements.css';

const TableRequirements = ({ requirements }) => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const navigate = useNavigate();

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleRowLeave = () => {
        setHoveredRow(null);
    };

    const handleRowClick = (requirement) => {
        // Navegar al detalle del requerimiento
        navigate(`/requirements/${requirement.codigo}`);
    };

    // Agrega esta función de ayuda para obtener el estilo de prioridad
    const getPriorityStyle = (prioridad) => {
        switch(prioridad) {
            case 'Alta':
                return 'priority-high';
            case 'Media':
                return 'priority-medium';
            case 'Baja':
                return 'priority-low';
            default:
                return '';
        }
    };

    return (
        <table className="requerimientos-table">
            <thead>
                <tr className="table-header">
                    <th>Código</th>
                    <th>Prioridad</th>
                    <th>Tipo</th>
                    <th>Categoría</th>
                    <th>Fecha de Alta</th>
                    <th>Estado</th>
                    <th>Asunto</th>
                    <th>Propietario</th>
                </tr>
            </thead>
            <tbody>
                {requirements.map((req, index) => (
                    <tr 
                        className={`table-row ${hoveredRow === index ? 'row-hovered' : ''}`}
                        key={`${req.codigo}-${index}`}
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={handleRowLeave}
                        onClick={() => handleRowClick(req)}
                    >
                        <td className="table-cell">{req.codigo}</td>
                        <td className="table-cell priority-cell">
                            <span className={`priority-dot ${getPriorityStyle(req.prioridad)}`}>
                                {req.prioridad}
                            </span>
                        </td>
                        <td className="table-cell">{req.tipo}</td>
                        <td className="table-cell">{req.categoria}</td>
                        <td className="table-cell">{req.fechaAlta}</td>
                        <td className="table-cell">{req.estado}</td>
                        <td className="table-cell">{req.asunto}</td>
                        <td className="table-cell">{req.propietario}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableRequirements;