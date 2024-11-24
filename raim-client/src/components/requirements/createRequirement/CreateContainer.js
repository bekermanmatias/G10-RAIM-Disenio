// src/components/requirements/createRequirement/CreateContainer.js
import React, { useEffect, useState } from 'react';

const CreateContainer = ({  
    setUsers
}) => {
    useEffect(() => {
        const fetchRequirementData = async () => {
            try {
                const usersResponse = await fetch('https://g10-raim-disenio.onrender.com/api/user');
                const usersData = await usersResponse.json();
                setUsers(usersData.map(user => ({
                    value: user.nombreUsuario,
                    label: `${user.nombre} (${user.nombreUsuario})`
                })));

                // resto de fetch para el futuro

            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchRequirementData();
    }, [setUsers]);

    return null; 
};

export default CreateContainer;