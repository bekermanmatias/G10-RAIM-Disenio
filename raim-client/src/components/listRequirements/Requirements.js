// src/components/listRequirements/Requirements.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import TableRequirements from './components/TableRequirements';
import FilterDropdown from './filters/FilterDropdown';
import FloatingCreateButton from './components/FloatingCreateButton';
import './Requirements.css';

export const requerimientosData = [
    {
        codigo: 'REQ-001',
        prioridad: 'Alta',
        tipo: 'Bug',
        categoria: 'Software',
        fechaAlta: '2023-10-01',
        estado: 'Abierto',
        asunto: 'Error en la página de inicio',
        propietario: 'Juan Pérez',
    },
    {
        codigo: 'REQ-002',
        prioridad: 'Media',
        tipo: 'Mejora',
        categoria: 'Hardware',
        fechaAlta: '2023-10-02',
        estado: 'En Progreso',
        asunto: 'Actualizar el servidor',
        propietario: 'Ana Gómez',
    },
    {
        codigo: 'REQ-003',
        prioridad: 'Baja',
        tipo: 'Mejora',
        categoria: 'General',
        fechaAlta: '2023-10-03',
        estado: 'Cerrado',
        asunto: 'Consulta sobre la política de privacidad',
        propietario: 'Luis Martínez',
    },
    {
        codigo: 'REQ-003',
        prioridad: 'Baja',
        tipo: 'Consulta',
        categoria: 'General',
        fechaAlta: '2023-10-03',
        estado: 'Cerrado',
        asunto: 'Consulta sobre la política de privacidad',
        propietario: 'Luis Martínez',
    },
    {
        codigo: 'REQ-003',
        prioridad: 'Alta',
        tipo: 'Consulta',
        categoria: 'General',
        fechaAlta: '2023-10-03',
        estado: 'Cerrado',
        asunto: 'Consulta sobre la política de privacidad',
        propietario: 'Luis Martínez',
    },
    // Agrega más requerimientos según sea necesario
];

const Requerimientos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filteredRequirements, setFilteredRequirements] = useState(requerimientosData);
    const navigate = useNavigate();
    const [activeFilters, setActiveFilters] = useState({
        estados: [],
        tipos: [],
        categorias: [],
        participacion: []
    });


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

    setFilteredRequirements(requerimientosData);
};

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleRowClick = (codigo) => {
        navigate(`/details-requirement/${codigo}`);
    };

    const handleApplyFilters = (selectedFilters) => {
        // No cerrar el menú de filtros
        setActiveFilters(selectedFilters);
        filterRequirements(searchTerm, selectedFilters);
    };

    const filterRequirements = (searchTerm, filters) => {
        let result = requerimientosData;
    
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

    return (
        <div className="requerimientos-container">
            <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                onResetFilter={handleResetFilter}
                onToggleFilters={toggleFilters}
            />

            {showFilters && (
                <FilterDropdown 
                    onClose={() => setShowFilters(false)} 
                    onApply={handleApplyFilters}
                    initialFilters={activeFilters}
                />
            )}

            <TableRequirements requirements={filteredRequirements} />
            <FloatingCreateButton />
        </div>
    );
};

export default Requerimientos;
