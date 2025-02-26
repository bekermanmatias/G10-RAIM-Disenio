// src/components/listUsers/UsersContainer.js
import React, { useEffect } from 'react';

const UsersContainer = ({ setFilteredUsers, setLoading, setError }) => {
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://g10-raim-disenio.onrender.com/api/user');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();

                const usuariosData = data.map(user => ({
                    legajo: user.legajo ? String(user.legajo) : 'Sin legajo',
                    nombreCompleto: user.nombre || 'Sin nombre',
                    cargo: user.cargo || 'Sin cargo',
                    departamento: user.nombreDepa.nombre || 'Sin departamento',
                    email: user.email || 'Sin email',
                    usuario: user.nombreUsuario || 'Sin usuario'
                }));

                setFilteredUsers(usuariosData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [setFilteredUsers, setLoading, setError]);

    return null;
};

export default UsersContainer;