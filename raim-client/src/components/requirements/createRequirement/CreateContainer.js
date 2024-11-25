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
                setUsers(usersData.map(user => ({
                    value: user.nombreUsuario,
                    label: `${user.nombre} (${user.nombreUsuario})`
                })));

                const tiposResponse = await fetch('https://g10-raim-disenio.onrender.com/api/tiporeq');
                const tiposData = await tiposResponse.json();
                setTipos(tiposData.map(tipo => tipo.descripcion));

                const categoriasResponse = await fetch('https://g10-raim-disenio.onrender.com/api/categoria/categorias-req');
                const categoriasData = await categoriasResponse.json();
                setCategorias(categoriasData.categorias.map(categoria => categoria.nombre));

            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        fetchRequirementData();
    }, [setUsers, setTipos, setCategorias]);

    return null; 
};

export default CreateContainer;