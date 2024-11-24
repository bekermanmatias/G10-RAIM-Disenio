// src/components/listRequirements/RequirementsContainer.js
import React, { useState, useEffect } from 'react';
import Requerimientos from './Requirements';
import { requerimientosData } from './Requirements';

const RequirementsContainer = () => {
    const [requirements, setRequirements] = useState([]);
    const [filteredRequirements, setFilteredRequirements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        estados: [],
        tipos: [],
        categorias: [],
        participacion: []
    });

    // Simular carga de datos estáticos
    useEffect(() => {
        // Simular un tiempo de carga
        const timer = setTimeout(() => {
            setRequirements(requerimientosData);
            setFilteredRequirements(requerimientosData);
            setIsLoading(false);
        }, 500); // Simulando un pequeño retraso como si fuera una carga real

        // Limpiar el timer si el componente se desmonta
        return () => clearTimeout(timer);
    }, []);

    // Función de filtrado
    const filterRequirements = (searchTerm, filters) => {
        let result = requirements;
    
        // Filtro por búsqueda
        if (searchTerm) {
            result = result.filter(req => 
                req.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.propietario.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    
        // Filtro por estados
        if (filters.estados && filters.estados.length > 0) {
            result = result.filter(req => 
                filters.estados.includes(req.estado)
            );
        }
    
        // Filtro por tipos
        if (filters.tipos && filters.tipos.length > 0) {
            result = result.filter(req => 
                filters.tipos.includes(req.tipo)
            );
        }
    
        // Filtro por categorías
        if (filters.categorias && filters.categorias.length > 0) {
            result = result.filter(req => 
                filters.categorias.includes(req.categoria)
            );
        }
    
        // Filtro por participacion
        if (filters.participacion && filters.participacion.length > 0) {
            result = result.filter(req => {
                if (filters.participacion.includes('Propietario')) {
                    return req.propietario === 'Juan Pérez'; // Ajusta al usuario actual
                }
                return true;
            });
        }
    
        setFilteredRequirements(result);
    };

    // Manejadores
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterRequirements(term, activeFilters);
    };

    const handleResetFilter = () => {
        setSearchTerm('');
        setActiveFilters({
            estados: [],
            tipos: [],
            categorias: [],
            participacion: []
        });
        setFilteredRequirements(requirements);
    };

    const handleApplyFilters = (selectedFilters) => {
        setActiveFilters(selectedFilters);
        filterRequirements(searchTerm, selectedFilters);
    };

    // Renderizado condicional para estado de carga
    if (isLoading) {
        return <div>Cargando requer imientos...</div>;
    }

    // Renderiza el componente Requerimientos con props
    return (
        <Requerimientos
            requirements={filteredRequirements}
            searchTerm={searchTerm}
            activeFilters={activeFilters}
            onSearchChange={handleSearch}
            onResetFilter={handleResetFilter}
            onApplyFilters={handleApplyFilters}
        />
    );
};

export default RequirementsContainer;