import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TableUsers.css';

const TableUsers = ({ users }) => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const navigate = useNavigate();

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleRowLeave = () => {
        setHoveredRow(null);
    };

    const handleRowClick = (user) => {
        // Navegar al detalle del usuario
        navigate(`/users/${user.legajo}`);
    };

    return (
        <table className="usuarios-table">
            <thead>
                <tr className="table-header">
                    <th>Nombre Completo</th>                    
                    <th>Legajo</th>
                    <th>Cargo</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr 
                        className={`table-row ${hoveredRow === index ? 'row-hovered' : ''}`}
                        key={`${user.legajo}-${index}`}
                        onMouseEnter={() => handleRowHover(index)}
                        onMouseLeave={handleRowLeave}
                        onClick={() => handleRowClick(user)}
                    >
                        <td className="table-cell">{user.nombreCompleto}</td>
                        <td className="table-cell">{user.legajo}</td>
                        <td className="table-cell">{user.cargo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableUsers;