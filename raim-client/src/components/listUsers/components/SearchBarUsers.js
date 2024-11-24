import React from 'react';

const SearchBarUsers = ({ 
    searchTerm, 
    onSearchChange, 
    onResetFilter, 
    onToggleFilters 
}) => {
    return (
        <div className="search-container">
            <div className="search-input-wrapper">
            <img
                className="search-icon"
                alt="Icono de busqueda"
                src="/assets/icons/lupa.svg"
                ></img>
                <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="search-bar"
                />
                <button 
                    className="filter-button-inside"
                    onClick={onToggleFilters}
                    title="Filtrar"
                >
                    <img 
                        src="/assets/icons/filter.svg"
                        alt="Filtrar" 
                        className="filter-icon-inside"
                    />
                </button>
            </div>
            <button 
                className="reset-filter-button"
                onClick={onResetFilter}
                title="Resetear filtros"
            >
                <img 
                    src="/assets/icons/reset-filt.svg"
                    alt="Resetear filtros" 
                    className="reset-icon"
                />
            </button>
        </div>
    );
};

export default SearchBarUsers;