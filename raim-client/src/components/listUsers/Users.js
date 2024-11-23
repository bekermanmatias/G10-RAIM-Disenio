// Users.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBarUsers';
import TableUsers from './components/TableUsers';
import FilterDropdownUsers from './filters/FilterDropdownUsers';
import './Users.css';

const usuariosData = [
    {
        legajo: 'EMP-001',
        nombreCompleto: 'Juan Pérez',
        cargo: 'Desarrollador Senior',
        departamento: 'Tecnología',
        email: 'juan.perez@empresa.com',
        usuario: 'juanperez',
    },
    {
        legajo: 'EMP-002',
        nombreCompleto: 'María González',
        cargo: 'Analista de Proyectos',
        departamento: 'Gestión',
        email: 'maria.gonzalez@empresa.com',
        usuario: 'mariagonzalez',
    },
    {
        legajo: 'EMP-003',
        nombreCompleto: 'Carlos Rodríguez',
        cargo: 'Gerente de TI',
        departamento: 'Sistemas',
        email: 'carlos.rodriguez@empresa.com',
        usuario: 'carlosrodriguez',
    },
    // Agrega más usuarios según sea necesario
];

const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState(usuariosData);
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
        setFilteredUsers(usuariosData);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleApplyFilters = (selectedFilters) => {
        setActiveFilters(selectedFilters);
        filterUsers(searchTerm, selectedFilters);
    };

    const filterUsers = (searchTerm, filters) => {
        let filtered = usuariosData;

        // Filtro por búsqueda
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.legajo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.usuario.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtrar por cargo
        if (filters.cargo.length > 0) {
            filtered = filtered.filter(user => 
                filters.cargo.includes(user.cargo)
            );
        }

        // Filtrar por departamento
        if (filters.departamentos.length > 0) {
            filtered = filtered.filter(user => 
                filters.departamentos.includes(user.departamento)
            );
        }

        setFilteredUsers(filtered);
    };

    return (
        <div className="usuarios-container">
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
                />
            )}

            <TableUsers users={filteredUsers} />
        </div>
    );
};

export default Users;