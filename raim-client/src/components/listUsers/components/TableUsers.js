// TableUsers.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './TableUsers.css';

const TableUsers = ({ users }) => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });
    const navigate = useNavigate();

    // Añade un useEffect para depuración
    useEffect(() => {
        console.log('Usuarios actualizados:', users);
    }, [users]);

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleRowLeave = () => {
        setHoveredRow(null);
    };

    const handleRowClick = (user) => {
        navigate(`/users/${user.legajo}`);
    };

    // Función para ordenar
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Renderizar icono de ordenamiento
    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return '⇅';
        return sortConfig.direction === 'ascending' ? '▲' : '▼';
    };

    // Función de comparación para ordenar
    const sortedUsers = useMemo(() => {
        if (!sortConfig.key) return users;

        return [...users].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [users, sortConfig]);

    return (
        <table className="usuarios-table">
            <thead>
                <tr className="table-header">
                    <th onClick={() => handleSort('legajo')}>
                        Legajo {renderSortIcon('legajo')}
                    </th>
                    <th onClick={() => handleSort('nombreCompleto')}>
                        Nombre Completo {renderSortIcon('nombreCompleto')}
                    </th>
                    <th onClick={() => handleSort('email')}>
                        Email {renderSortIcon('email')}
                    </th>
                    <th onClick={() => handleSort('usuario')}>
                        Usuario {renderSortIcon('usuario')}
                    </th>
                    <th onClick={() => handleSort('cargo')}>
                        Cargo {renderSortIcon('cargo')}
                    </th>
                    <th onClick={() => handleSort('departamento')}>
                        Departamento {renderSortIcon('departamento')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map((user, index) => (
                    <tr 
                        className={`table-row ${hoveredRow === index ? 'row-hovered' : ''}`}
                        key={`${user.legajo}-${index}`}
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={handleRowLeave}
                        onClick={() => handleRowClick(user)}
                    >
                       <td className="table-cell">{user.legajo}</td> 
                       <td className="table-cell">{user.nombreCompleto}</td>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{user.usuario}</td>
                        <td className="table-cell">{user.cargo}</td>
                        <td className="table-cell">{user.departamento}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableUsers;