// TableUsers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TableUsers.css';

const TableUsers = ({ users }) => {
    const [hoveredRow, setHoveredRow] = useState(null);
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

    return (
        <table className="usuarios-table">
            <thead>
                <tr className="table-header">
                    <th>Legajo</th>
                    <th>Nombre Completo</th>
                    <th>Email</th>
                    <th>Usuario</th>
                    <th>Cargo</th>
                    <th>Departamento</th>
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
                       <td className="table-cell">{user.legajo}</td> 
                       <td className="table-cell">{user.nombreCompleto}</td>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{user.usuario }</td>
                        <td className="table-cell">{user.cargo}</td>
                        <td className="table-cell">{user.departamento}</td>
                        
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableUsers;