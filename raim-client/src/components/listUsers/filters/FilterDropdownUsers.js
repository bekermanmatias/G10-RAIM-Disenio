import React, { useState, useEffect } from 'react';
import './FilterDropdown.css';

const FilterDropdownUsers = ({ 
    onClose, 
    onApply, 
    initialFilters, 
    cargos = [], 
    departamentos = [] 
}) => {
    const [filters, setFilters] = useState({
        cargo: [],
        departamentos: []
    });

    useEffect(() => {
        if (initialFilters) {
            setFilters(initialFilters);
        }
    }, [initialFilters]);

    const filterOptions = {
        cargo: cargos,
        departamentos: departamentos
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
        onClose(); // cerrar el menú después de aplicar
    };

    const splitOptionsIntoColumns = (options) => {
        const halfLength = Math.ceil(options.length / 2);
        return [
            options.slice(0, halfLength),
            options.slice(halfLength)
        ];
    };

    return (
        <div className="filter-dropdown">
            <div className="filter-dropdown-content">
                <div className="filter-columns">
                    {Object.entries(filterOptions).map(([group, options]) => {
                        const [column1, column2] = splitOptionsIntoColumns(options);
                        return (
                            <div key={group} className="filter-column">
                                <h4>{group.charAt(0).toUpperCase() + group.slice(1)}</h4>
                                <div className="filter-column-grid">
                                    <div className="filter-column-half">
                                        {column1.map(option => (
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
                                    <div className="filter-column-half">
                                        {column2.map(option => (
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
                                </div>
                            </div>
                        );
                    })}
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

export default FilterDropdownUsers;