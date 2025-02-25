import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import TableRequirements from './components/TableRequirements';
import FilterDropdown from './filters/FilterDropdown';
import FloatingCreateButton from './components/FloatingCreateButton';
import RequirementsContainer from './RequirementsContainer';
import FilterContainer from './filters/FilterContainer'; 
import LoadingSpinner from '../../utils/LoadingSpinner';
import './Requirements.css';

const Requerimientos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filteredRequirements, setFilteredRequirements] = useState([]);
    const [requerimientosData, setRequerimientosData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tipos, setTipos] = useState([]); 
    const [categorias, setCategorias] = useState([]); 
    const [userData, setUserData] = useState({
        nombre: null,
        idUser: 0
    });
    const [activeFilters, setActiveFilters] = useState({
        estados: [],
        tipos: [],
        categorias: [],
        participacion: []
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const fetchUserData = async () => {

        const username = String(localStorage.getItem('usuario'));
        const response = await fetch(`https://g10-raim-disenio.onrender.com/api/user/${username}`);
        if (!response.ok){
            throw new Error('Error al obtener el usuario.');
        }
        const data = await response.json();
        const datosUser = {
            nombre: data.nombre,
            idUser: data.idUsuario
        }
        setUserData(datosUser);
    }
    useEffect(() => {
        fetchRequirements(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchRequirements =async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`https://g10-raim-disenio.onrender.com/api/requirement?page=${page}&limit=50`);
            const data = await response.json();
            setTotalPages(data.totalPages);
            setCurrentPage(page);
            const requerimientosData = data.requirements.map(req => ({
                codigo: req.codigo, 
                prioridad: req.prioridad.descripcion, 
                tipo: req.tipoReq.descripcion, 
                categoria: req.categoria.descripcion, 
                fechaAlta: req.fechaHora,
                estado: req.estado.descripcion, 
                asunto: req.asunto,
                propietario: req.idUserDestinatario ? `Usuario ${req.idUserDestinatario}` : 'Sin asignar', 
                emisor: req.idUsuarioCreador.nombre ? req.idUsuarioCreador.nombre : 'Sin asignar'
            }));
            console.log(requerimientosData);
            setFilteredRequirements(requerimientosData);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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
        setActiveFilters(selectedFilters);
        filterRequirements(searchTerm, selectedFilters);
        setShowFilters(false);
    };

    const filterRequirements = (searchTerm, filters) => {
        let result = filteredRequirements;
        console.log(result);
        if (searchTerm) {
            result = result.filter(req => 
                req.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.propietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.emisor.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filters.estados && filters.estados.length > 0) {
            result = result.filter(req => 
                filters.estados.includes(req.estado)
            );
        }

        if (filters.tipos && filters.tipos.length > 0) {
            result = result.filter(req => 
                filters.tipos.includes(req.tipo)
            );
        }

        if (filters.categorias && filters.categorias.length > 0) {
            result = result.filter(req => 
                filters.categorias.includes(req.categoria)
            );
        }

        if (filters.participacion && filters.participacion.length > 0) {
            result = result.filter(req => {
                console.log(result);
                const filtrarEmisor = filters.participacion.includes('Emisor') ? req.emisor === userData.nombre : true;
                const filtrarAsignado = filters.participacion.includes('Asignado') ? req.propietario === userData.idUser : true;
                return filtrarEmisor && filtrarAsignado;
            });
        }
        setFilteredRequirements(result);
    };

    return (
        <div className="requerimientos-container">
            <FilterContainer 
                setTipos={setTipos} 
                setCategorias={setCategorias} 
            />

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
                    tipos={tipos}
                    categorias={categorias}
                />
            )}

            <RequirementsContainer 
                setFilteredRequirements={setFilteredRequirements} 
                setRequerimientosData={setRequerimientosData} 
                setLoading={setLoading} 
                setError={setError} 
            />

            

            <TableRequirements requirements={filteredRequirements} />
            {loading && <LoadingSpinner />} 
            {error && <p>Error: {error}</p>}

            <div className="pagination">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                >
                      Anterior
                </button>

                <span>Página {currentPage} de {totalPages}</span>

                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                >
                       Siguiente
                </button>
            </div>
            
            <FloatingCreateButton />
        </div>
    );
};

export default Requerimientos;