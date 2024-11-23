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

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        
        const filtered = usuariosData.filter(user =>
            user.nombreCompleto.toLowerCase().includes(term.toLowerCase()) ||
            user.legajo.toLowerCase().includes(term.toLowerCase()) ||
            user.cargo.toLowerCase().includes(term.toLowerCase()) ||
            user.departamento.toLowerCase().includes(term.toLowerCase()) ||
            user.usuario.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleResetFilter = () => {
        setSearchTerm('');
        setFilteredUsers(usuariosData);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleApplyFilters = (selectedFilters) => {
        console.log('Filtros aplicados:', selectedFilters);
        
        let filtered = usuariosData;

        // Filtrar por cargo
        if (selectedFilters.cargo.length > 0) {
            filtered = filtered.filter(user => 
                selectedFilters.cargo.includes(user.cargo)
            );
        }

        // Filtrar por departamento
        if (selectedFilters.departamentos.length > 0) {
            filtered = filtered.filter(user => 
                selectedFilters.departamentos.includes(user.departamento)
            );
        }

        setFilteredUsers(filtered);
        setShowFilters(false);
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
                />
            )}

            <TableUsers users={filteredUsers} />
        </div>
    );
};

export default Users;