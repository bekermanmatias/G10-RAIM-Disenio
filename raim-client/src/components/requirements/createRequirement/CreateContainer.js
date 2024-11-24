import React, { useEffect, useState } from 'react';

const CreateContainer = ({  
    setUsers,
    setTipos,
    setCategorias
}) => {
    useEffect(() => {
        const fetchRequirementData = async () => {
            try {
                // Fetch de usuarios
                const usersResponse = await fetch('https://g10-raim-disenio.onrender.com/api/user');
                const usersData = await usersResponse.json();
                setUsers(usersData.map(user => ({
                    value: user.nombreUsuario,
                    label: `${user.nombre} (${user.nombreUsuario})`
                })));

                // Fetch de tipos de requerimiento
                const tiposResponse = await fetch('https://g10-raim-disenio.onrender.com/api/tiporeq');
                const tiposData = await tiposResponse.json();
                setTipos(tiposData.map(tipo => tipo.descripcion));

                // Fetch de categorías
                const categoriasResponse = await fetch('https://g10-raim-disenio.onrender.com/api/catiporeq');
                const categoriasData = await categoriasResponse.json();
                setCategorias(categoriasData.map(categoria => categoria.descripcion));

            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchRequirementData();
    }, [setUsers, setTipos, setCategorias]);

    return null; 
};

export default CreateContainer;