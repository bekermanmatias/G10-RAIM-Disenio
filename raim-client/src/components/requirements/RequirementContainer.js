// src/components/requirements/RequirementContainer.js
import React, { useEffect } from 'react';

const RequirementContainer = ({ codigo, setRequerimiento, setLoading, setError }) => {
    useEffect(() => {
        const fetchRequirementDetail = async () => {
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/requirement/${codigo}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el requerimiento');
                }
                const data = await response.json();
                
                // Funciones de mapeo (mantener igual que en versión anterior)
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

                // Mapeo del requerimiento
                const requerimientoData = {
                    codigo: data.codigo,
                    prioridad: getPrioridadTexto(data.idPrioridad),
                    tipo: getTipoTexto(data.idTipoReq),
                    categoria: getCategoriaTexto(data.idTipoRequerimiento),
                    fechaAlta: new Date(data.fechaHora).toLocaleDateString(),
                    estado: getEstadoTexto(data.idEstado),
                    asunto: data.asunto,
                    descripcion: data.descripcion,
                    propietario: data.idUser ? `Usuario ${data.idUser}` : 'Sin propietario'
                };

                // Actualizar estados
                setRequerimiento(requerimientoData);
                setLoading(false);
            } catch (error) {
                // Actualizar estados en caso de error
                setError(error.message);
                setLoading(false);
            }
        };

        // Llamar a la función de fetch
        fetchRequirementDetail();
    }, [codigo, setRequerimiento, setLoading, setError]);

    // Retornar null ya que este componente no renderiza nada
    return null;
};

export default RequirementContainer;