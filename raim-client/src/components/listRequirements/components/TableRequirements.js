// src/components/listRequirements/components/TableRequirements.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TableRequirements.css';

const TableRequirements = ({ requirements }) => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });
    const navigate = useNavigate();

    const priorityOrder = {
        'Urgente': 1,
        'Alta': 2,
        'Media': 3,
        'Baja': 4
    };

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleRowLeave = () => {
        setHoveredRow(null);
    };

    const handleRowClick = (requirement) => {
        navigate(`/requirements/${requirement.codigo}`);
    };

    const getPriorityStyle = (prioridad) => {
        switch(prioridad) {
            case 'Urgente':
                return 'priority-urgent';
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

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedRequirements = React.useMemo(() => {
        if (!sortConfig.key) return requirements;

        if (sortConfig.key === 'prioridad') {
            return [...requirements].sort((a, b) => {
                const priorityA = priorityOrder[a.prioridad];
                const priorityB = priorityOrder[b.prioridad];
                
                if (sortConfig.direction === 'ascending') {
                    return priorityA - priorityB;
                } else {
                    return priorityB - priorityA;
                }
            });
        }

        return [...requirements].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [requirements, sortConfig]);

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return '⇅';
        return sortConfig.direction === 'ascending' ? '▲' : '▼';
    };

    return (
        <table className="requerimientos-table">
            <thead>
                <tr className="table-header">
                    <th onClick={() => handleSort('codigo')}>
                        Código {renderSortIcon('codigo')}
                    </th>
                    <th onClick={() => handleSort('prioridad')}>
                        Prioridad {renderSortIcon('prioridad')}
                    </th>
                    <th onClick={() => handleSort('tipo')}>
                        Tipo {renderSortIcon('tipo')}
                    </th>
                    <th onClick={() => handleSort('categoria')}>
                        Categoría {renderSortIcon('categoria')}
                    </th>
                    <th onClick={() => handleSort('fechaAlta')}>
                        Fecha de Alta {renderSortIcon('fechaAlta')}
                    </th>   
                    <th onClick={() => handleSort('asunto')}>
                        Asunto {renderSortIcon('asunto')}
                    </th>
                    <th onClick={() => handleSort('estado')}>
                        Estado {renderSortIcon('estado')}
                    </th>

                </tr>
            </thead>
            <tbody>
                {sortedRequirements.map((req, index) => (
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
                        <td className="table-cell">{req.fechaAlta.split('T')[0]}</td>
                        <td className="table-cell">{req.asunto}</td>
                        <td className="table-cell">{req.estado}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableRequirements;