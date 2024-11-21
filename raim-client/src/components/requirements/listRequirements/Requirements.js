import React, { useState } from 'react';
import FilterDropdown from './FilterDropdown';
import './Requirements.css';

const requerimientosData = [
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleResetFilter = () => {
        // Por ahora, solo resetea el término de búsqueda
        // En el futuro, podrás expandir esta función para resetear filtros más complejos
        setSearchTerm('');
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const filteredRequerimientos = requerimientosData.filter(req =>
        req.asunto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="requerimientos-container">
        <div className="search-container">
            <input
                type="text"
                placeholder="Buscar requerimientos..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
            />
            <button 
                className="reset-filter-button"
                onClick={handleResetFilter}
                title="Resetear filtros"
            >
                <img 
                    src="/assets/icons/reset-filt.svg"
                    alt="Resetear filtros" 
                    className="reset-icon"
                />
            </button>
            <button 
                className="filter-button"
                onClick={toggleFilters}
                title="Filtrar"
            >
                <img 
                    src="/assets/icons/filter.svg"
                    alt="Filtrar" 
                    className="filter-icon"
                />
            </button>
        </div>

        {showFilters && <FilterDropdown />}
            <table className="requerimientos-table">
                <thead>
                    <tr className="table-header">
                        <th>Código</th>
                        <th>Prioridad</th>
                        <th>Tipo</th>
                        <th>Categoría</th>
                        <th>Fecha de Alta</th>
                        <th>Estado</th>
                        <th>Asunto</th>
                        <th>Propietario</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequerimientos.map(req => (
                        <tr className="table-row" key={req.codigo}>
                            <td className="table-cell">{req.codigo}</td>
                            <td className="table-cell">{req.prioridad}</td>
                            <td className="table-cell">{req.tipo}</td>
                            <td className="table-cell">{req.categoria}</td>
                            <td className="table-cell">{req.fechaAlta}</td>
                            <td className="table-cell">{req.estado}</td>
                            <td className="table-cell">{req.asunto}</td>
                            <td className="table-cell">{req.propietario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Requerimientos;