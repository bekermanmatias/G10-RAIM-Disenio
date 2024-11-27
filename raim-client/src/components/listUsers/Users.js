// src/components/listUsers/Users.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBarUsers';
import TableUsers from './components/TableUsers';
import FilterDropdownUsers from './filters/FilterDropdownUsers';
import FilterContainerUsers from './filters/FilterContainerUsers';
import UsersContainer from './UsersContainer';
import LoadingSpinner from '../../utils/LoadingSpinner';
import './Users.css';

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cargos, setCargos] = useState([]); 
    const [departamentos, setDepartamentos] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        cargo: [],
        departamentos: []
    });

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterUsers(term, activeFilters);
    };

    const handleResetFilter = () => {
        setSearchTerm('');
        setActiveFilters({
            cargo: [],
            departamentos: []
        });
        
        filterUsers('', { cargo: [], departamentos: [] });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleApplyFilters = (selectedFilters) => {
        setActiveFilters(selectedFilters);
        filterUsers(searchTerm, selectedFilters);
    };

    const filterUsers = (searchTerm, filters) => {
        let filtered = filteredUsers;
    
        if (searchTerm) {
            filtered = filtered.filter(user =>
                String(user.legajo).toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.usuario.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    
        if (filters.cargo.length > 0) {
            filtered = filtered.filter(user => 
                filters.cargo.includes(user.cargo)
            );
        }
    
        if (filters.departamentos.length > 0) {
            filtered = filtered.filter(user => 
                filters.departamentos.includes(user.departamento)
            );
        }
    
        return filtered;
    };

    return (
        <div className="usuarios-container">
            <FilterContainerUsers 
                setCargos={setCargos} 
                setDepartamentos={setDepartamentos} 
            />

            <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                onResetFilter={handleResetFilter}
                onToggleFilters={toggleFilters}
            />

            {showFilters && (
                <FilterDropdownUsers 
                    onClose={() => setShowFilters(false)} 
                    onApply={handleApplyFilters}
                    initialFilters={activeFilters}
                    cargos={cargos}
                    departamentos={departamentos}
                />
            )}

            <UsersContainer 
                setFilteredUsers={setFilteredUsers}
                setLoading={setLoading}
                setError={setError}
            />

            {loading && <LoadingSpinner />} 
            {error && <p>Error: {error}</p>}

            <TableUsers users={filterUsers(searchTerm, activeFilters)} />
        </div>
    );
};

export default Users;