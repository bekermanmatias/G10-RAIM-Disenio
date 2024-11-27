import React, { useEffect } from 'react';

const UserContainer = ({ nombreUsuario, setUsuario, setLoading, setError }) => {
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/user/${nombreUsuario}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                const data = await response.json();

                // Mapeo de datos
                const mappedData = {
                    id: data.idUsuario,
                    nombreCompleto: data.nombre,
                    usuario: data.nombreUsuario,
                    email: data.email,
                    cargo: data.cargo,
                    legajo: data.legajo,
                    departamento: data.nombreDepa.nombre, // Asumiendo que quieres el nombre del departamento
                    fechaIngreso: data.createdAt, // O puedes usar updatedAt si es más relevante
                };

                setUsuario(mappedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [nombreUsuario, setUsuario, setLoading, setError]);

    return null; // Este componente no renderiza nada, solo maneja la lógica
};

export default UserContainer;