// src/components/listRequirements/filters/FilterDropdown.js
import React, { useState, useEffect } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ onClose, onApply, initialFilters }) => {
    const [filters, setFilters] = useState({
        estados: [],
        tipos: [],
        categorias: [],
        participacion: []
    });

    // Efecto para cargar los filtros iniciales
    useEffect(() => {
        if (initialFilters) {
            setFilters(initialFilters);
        }
    }, [initialFilters]);

    const filterOptions = {
        estados: ['Abierto', 'Asignado'],
        tipos: ['Bug', 'Mejora', 'Consulta'],
        categorias: ['Software', 'Hardware', 'General'],
        participacion: ['Emisor','Asignado']
    };

    const handleCheckboxChange = (group, value) => {
        setFilters(prev => {
            const currentGroup = prev[group];
            const newGroup = currentGroup.includes(value)
                ? currentGroup.filter(item => item !== value)
                : [...currentGroup, value];
            
            return {
                ...prev,
                [group]: newGroup
            };
        });
    };

    const handleApply = () => {
        onApply(filters);
    };

    return (
        <div className="filter-dropdown">
            <div className="filter-dropdown-content">
                <div className="filter-columns">
                    {Object.entries(filterOptions).map(([group, options]) => (
                        <div key={group} className="filter-column">
                            <h4>{group.charAt(0).toUpperCase() + group.slice(1)}</h4>
                            {options.map(option => (
                                <label key={option} className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={filters[group].includes(option)}
                                        onChange={() => handleCheckboxChange(group, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="filter-actions">
                    <button 
                        className="filter-cancel-btn" 
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="filter-apply-btn" 
                        onClick={handleApply}
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;