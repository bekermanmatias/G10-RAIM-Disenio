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
                        <td className="table-cell">{req.prioridad}</td>
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