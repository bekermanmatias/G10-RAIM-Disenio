// src/components/listRequirements/RequirementsContainer.js
import React, { useEffect } from 'react';

const RequirementsContainer = ({ setFilteredRequirements, setRequerimientosData, setLoading, setError }) => {
    useEffect(() => {
        const fetchRequirements = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://g10-raim-disenio.onrender.com/api/requirement');
                if (!response.ok) {
                    throw new Error('Error al obtener los requerimientos');
                }
                const data = await response.json();

                // Mapeo de prioridades, estados, tipos, y categorías
                const getPrioridadTexto = (idPrioridad) => {
                    switch(idPrioridad) {
                        case 1: return 'Urgente';
                        case 2: return 'Alta';
                        case 3: return 'Media';
                        case 4: return 'Baja';
                        default: return 'Sin prioridad';
                    }
                };

                const getEstadoTexto = (idEstado) => {
                    switch(idEstado) {
                        case 1: return 'Abierto';
                        case 2: return 'Asignado';
                        default: return 'Sin estado';
                    }
                };

                const getTipoTexto = (idTipo) => {
                    switch(idTipo) {
                        case 1: return 'Bug';
                        case 2: return 'Mejora';
                        case 3: return 'Consulta';
                        default: return 'Sin tipo';
                    }
                };

                const getCategoriaTexto = (idCategoria) => {
                    switch(idCategoria) {
                        case 1: return 'Software';
                        case 2: return 'Hardware';
                        case 3: return 'General';
                        default: return 'Sin categoría';
                    }
                };

                // Mapeo de requerimientos
                const requerimientosData = data.map(req => ({
                    codigo: req.codigo,
                    prioridad: getPrioridadTexto(req.idPrioridad),
                    tipo: getTipoTexto(req.idTipoReq),
                    categoria: getCategoriaTexto(req.idTipoRequerimiento),
                    fechaAlta: new Date(req.fechaHora).toLocaleDateString(), // Formatea la fecha
                    estado: getEstadoTexto(req.idEstado),
                    asunto: req.asunto,
                    propietario: req.idUsuarioDestinatario  ? `Usuario ${req.idUsuarioDestinatario}` : 'Sin asignar', // Ajusta según necesites
                    emisor: req.idUser
                }));

                setFilteredRequirements(requerimientosData);
                setRequerimientosData(requerimientosData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequirements();
    }, [setFilteredRequirements, setRequerimientosData, setLoading, setError]);

    return null; // Este componente no renderiza nada por sí mismo
};

export default RequirementsContainer;