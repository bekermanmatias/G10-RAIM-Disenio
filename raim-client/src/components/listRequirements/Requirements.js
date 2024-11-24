// src/components/listRequirements/Requirements.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import TableRequirements from './components/TableRequirements';
import FilterDropdown from './filters/FilterDropdown';
import FloatingCreateButton from './components/FloatingCreateButton';
import RequirementsContainer from './RequirementsContainer';
import './Requirements.css';

const Requerimientos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filteredRequirements, setFilteredRequirements] = useState([]);
    const [requerimientosData, setRequerimientosData] = useState([]);
    const [loading, setLoading] = useState(false); // Nuevo estado para loading
    const [error, setError] = useState(null); // Nuevo estado para error
    const [activeFilters, setActiveFilters] = useState({
        estados: [],
        tipos: [],
        categorias: [],
        participacion: []
    });
    const navigate = useNavigate();

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
        setActiveFilters(selectedFilters);
        filterRequirements(searchTerm, selectedFilters);
    };

    const filterRequirements = (searchTerm, filters) => {
        let result = requerimientosData;

        if (searchTerm) {
            result = result.filter(req => 
                req.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.propietario.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filters.estados && filters.estados.length > 0) {
            result = result.filter(req => 
                filters.estados.includes(req.estado)
            );
        }

        if (filters.tipos && filters.tipos.length > 0) {
            result = result.filter(req => 
                filters.tipos.includes(req.tipo)
            );
        }

        if (filters.categorias && filters.categorias.length > 0) {
            result = result.filter(req => 
                filters.categorias.includes(req.categoria)
            );
        }

        if (filters.participacion && filters.participacion.length > 0) {
            result = result.filter(req => {
                if (filters.participacion.includes('Emisor')) {
                    return req.emisor === 7; // Ajusta al usuario actual
                }
                return true;
            });
        }

        if (filters.participacion && filters.participacion.length > 0) {
            result = result.filter(req => {
                if (filters.participacion.includes('Asignado')) {
                    return req.propietario === 7; // Ajusta al usuario actual
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

            <RequirementsContainer 
                setFilteredRequirements={setFilteredRequirements} 
                setRequerimientosData={setRequerimientosData} 
                setLoading={setLoading} 
                setError={setError} 
            />

            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}

            <TableRequirements requirements={filteredRequirements} />
            <FloatingCreateButton />
        </div>
    );
};

export default Requerimientos;