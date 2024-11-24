// src/components/listUsers/filters/FilterContainerUsers.js
import React, { useEffect } from 'react';

const FilterContainerUsers = ({ setCargos, setDepartamentos }) => {
    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                // Fetch de departamentos
                const departamentosResponse = await fetch('https://g10-raim-disenio.onrender.com/api/departamento');
                const departamentosData = await departamentosResponse.json();
                const departamentosNombres = departamentosData.map(depto => depto.nombre);
                setDepartamentos(departamentosNombres);

                // Fetch de usuarios para obtener cargos
                const usuariosResponse = await fetch('https://g10-raim-disenio.onrender.com/api/user');
                const usuariosData = await usuariosResponse.json();
                
                // Obtener cargos únicos
                const cargosUnicos = [...new Set(usuariosData.map(usuario => usuario.cargo))]
                    .filter(cargo => cargo); // Eliminar valores vacíos
                
                setCargos(cargosUnicos);

            } catch (error) {
                console.error('Error al cargar datos de filtros:', error);
            }
        };

        fetchFilterData();
    }, [setCargos, setDepartamentos]);

    return null;
};

export default FilterContainerUsers;