// TableUsers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TableUsers.css';
import axios from 'axios';

const TableUsers = () => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const {users, setUsers} = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    const fetchUsers = async () =>{
        try{
            const response = await axios.get(`http://g10-raim-disenio.onrender.com/api/user`);
            setUsers(response.data);
        }
        catch (err){
            if (err.response && err.response.status === 404) {
                setError('Usuarios no encontrados.');
            } else {
                setError('Error al cargar los usuarios.');
            }
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRowHover = (index) => {
        setHoveredRow(index);
    };

    const handleRowLeave = () => {
        setHoveredRow(null);
    };

    const handleRowClick = (user) => {
        navigate(`/user/${user.nombreUsuario}`);
    };

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>{error}</p>;

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
                       <td className="table-cell">{user.nombre}</td>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{user.nombreUsuario }</td>
                        <td className="table-cell">{user.cargo}</td>
                        <td className="table-cell">{user.departamento}</td>
                        
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableUsers;