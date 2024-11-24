// src/components/users/UserContainer.js
import React, { useEffect } from 'react';

const UserContainer = ({ nombreUsuario, setUsuario, setLoading, setError }) => {
    useEffect(() => {
        const fetchUserDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/user/${nombreUsuario}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del usuario');
                }
                const data = await response.json();

                // Mapear datos del usuario
                const usuarioDetalle = {
                    legajo: data.legajo || 'Sin legajo',
                    nombreCompleto: data.nombre || 'Sin nombre',
                    usuario: data.nombreUsuario || 'Sin usuario',
                    email: data.email || 'Sin email',
                    cargo: data.cargo || 'Sin cargo',
                    departamento: data.departamento || 'Sin departamento',
                    // Campos adicionales que puedas necesitar
                };

                setUsuario(usuarioDetalle);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (nombreUsuario) {
            fetchUserDetail();
        }
    }, [nombreUsuario, setUsuario, setLoading, setError]);

    return null;
};

export default UserContainer;