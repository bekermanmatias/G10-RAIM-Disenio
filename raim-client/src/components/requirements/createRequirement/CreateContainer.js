import React, { useEffect } from 'react';

const CreateContainer = ({  
    setUsers,
    setTipos,
    setCategorias
}) => {
    useEffect(() => {
        const fetchRequirementData = async () => {
            try {
                const usersResponse = await fetch('https://g10-raim-disenio.onrender.com/api/user');
                const usersData = await usersResponse.json();
                
                const sortedUsers = usersData.sort((a, b) => {
                    return a.nombre.localeCompare(b.nombre);
                });

                setUsers(sortedUsers.map(user => ({
                    value: user.nombreUsuario,
                    label: `${user.nombre} (${user.nombreUsuario})`
                })));

                const tiposResponse = await fetch('https://g10-raim-disenio.onrender.com/api/tiporeq');
                const tiposData = await tiposResponse.json();
                setTipos(tiposData.map(tipo => tipo.descripcion));

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