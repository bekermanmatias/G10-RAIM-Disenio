import React, { useState } from 'react';
import './FilterDropdown.css'; // Crea este archivo para estilos específicos

const FilterDropdown = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        estado: false,
        tipo: false,
        categoria: false
    });

    const handleFilterChange = (filterName) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName]
        }));
    };

    return (
        <div className="filter-dropdown">
            <h4>Filtros</h4>
            <div className="filter-options">
                <label>
                    <input 
                        type="checkbox" 
                        checked={selectedFilters.estado}
                        onChange={() => handleFilterChange('estado')}
                    /> 
                    Estado
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        checked={selectedFilters.tipo}
                        onChange={() => handleFilterChange('tipo')}
                    /> 
                    Tipo
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        checked={selectedFilters.categoria}
                        onChange={() => handleFilterChange('categoria')}
                    /> 
                    Categoría
                </label>
            </div>
        </div>
    );
};

export default FilterDropdown;