// src/components/listRequirements/filters/FilterContainer.js
import React, { useEffect, useState } from 'react';

const FilterContainer = ({ setTipos, setCategorias }) => {
    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                // Fetch de tipos de requerimiento
                const tiposResponse = await fetch('https://g10-raim-disenio.onrender.com/api/tiporeq');
                const tiposData = await tiposResponse.json();
                setTipos(tiposData.map(tipo => tipo.descripcion));

                // Fetch de categorías
                const categoriasResponse = await fetch('https://g10-raim-disenio.onrender.com/api/catiporeq');
                const categoriasData = await categoriasResponse.json();
                setCategorias(categoriasData.map(categoria => categoria.descripcion));

            } catch (error) {
                console.error('Error al cargar datos de filtros:', error);
            }
        };

        fetchFilterData();
    }, [setTipos, setCategorias]);

    return null;
};

export default FilterContainer;