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
        tipo: 'Consulta',
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
        prioridad: 'Baja',
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


    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        
        const filtered = requerimientosData.filter(req =>
            req.asunto.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredRequirements(filtered);
    };

    const handleResetFilter = () => {
        setSearchTerm('');
        setFilteredRequirements(requerimientosData);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleRowClick = (codigo) => {
        navigate(`/details-requirement/${codigo}`);
    };

    const handleApplyFilters = (selectedFilters) => {
        console.log('Filtros aplicados:', selectedFilters);
        setShowFilters(false);
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
                />
            )}

            <TableRequirements requirements={filteredRequirements} />
            <FloatingCreateButton />
        </div>
    );
};

export default Requerimientos;
