// src/components/listRequirements/filters/FilterDropdown.js
import React, { useState, useEffect } from 'react';
import './FilterDropdown.css';
import CustomButton from '../../../utils/CustomButton';

const FilterDropdown = ({ 
    onClose, 
    onApply, 
    initialFilters, 
    tipos = [], 
    categorias = [] 
}) => {
    const [filters, setFilters] = useState({
        estados: [],
        tipos: [],
        categorias: [],
        participacion: []
    });

    useEffect(() => {
        if (initialFilters) {
            setFilters(initialFilters);
        }
    }, [initialFilters]);

    const filterOptions = {
        estados: ['Abierto', 'Asignado'],
        tipos: tipos, 
        categorias: categorias, 
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
                <CustomButton 
                        variant="cancel" 
                        onClick={onClose}
                        width="100px" // Ajusta el tamaño según sea necesario
                        mr={2}
                    >
                        Cancelar
                    </CustomButton>
                    <CustomButton 
                        variant="apply" 
                        onClick={handleApply}
                        width="100px" // Debe ser el mismo tamaño que el botón de cancelar
                    >
                        Aplicar
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default FilterDropdown;