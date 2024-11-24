// src/components/listRequirements/Requirements.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import TableRequirements from './components/TableRequirements';
import FilterDropdown from './filters/FilterDropdown';
import FloatingCreateButton from './components/FloatingCreateButton';
import './Requirements.css';

const Requerimientos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filteredRequirements, setFilteredRequirements] = useState([]);
    const [requerimientosData, setRequerimientosData] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        estados: [],
        tipos: [],
        categorias: [],
        participacion: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await fetch('https://g10-raim-disenio.onrender.com/api/requirement');
                const data = await response.json();
    
                // Mapeo de prioridades
                const getPrioridadTexto = (idPrioridad) => {
                    switch(idPrioridad) {
                        case 1: return 'Urgente';
                        case 2: return 'Alta';
                        case 3: return 'Media';
                        case 4: return 'Baja';
                        default: return 'Sin prioridad';
                    }
                };
    
                // Mapeo de estados
                const getEstadoTexto = (idEstado) => {
                    switch(idEstado) {
                        case 1: return 'Abierto';
                        case 2: return 'Asignado';
                        default: return 'Sin estado';
                    }
                };
    
                // Mapeo de tipos
                const getTipoTexto = (idTipo) => {
                    switch(idTipo) {
                        case 1: return 'Bug';
                        case 2: return 'Mejora';
                        case 3: return 'Consulta';
                        default: return 'Sin tipo';
                    }
                };
    
                // Mapeo de categorías
                const getCategoriaTexto = (idCategoria) => {
                    switch(idCategoria) {
                        case 1: return 'Software';
                        case 2: return 'Hardware';
                        case 3: return 'General';
                        default: return 'Sin categoría';
                    }
                };
    
                //Mapeo de requerimientos
            const requerimientosData = data.map(req => ({
                codigo: req.codigo,
                prioridad: getPrioridadTexto(req.idPrioridad),
                tipo: getTipoTexto(req.idTipoReq),
                categoria: getCategoriaTexto(req.idTipoRequerimiento),
                fechaAlta: new Date(req.fechaHora).toLocaleDateString(), // Formatea la fecha
                estado: getEstadoTexto(req.idEstado),
                asunto: req.asunto,
                propietario: req.idUser ? `Usuario ${req.idUser}` : 'Sin propietario' // Ajusta según necesites
            }));

    
                setFilteredRequirements(requerimientosData);
                setRequerimientosData(requerimientosData);
            } catch (error) {
                console.error('Error fetching requirements:', error);
            }
        };
    
        fetchRequirements();
    }, []);

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
