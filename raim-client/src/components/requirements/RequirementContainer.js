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
                
                // Funciones de mapeo actualizadas según los datos recibidos
                const getPrioridadTexto = (prioridad) => {
                    return prioridad.descripcion || 'Sin prioridad';
                };

                const getEstadoTexto = (estado) => {
                    return estado.descripcion || 'Sin estado';
                };

                const getTipoTexto = (tipoReq) => {
                    return tipoReq.descripcion || 'Sin tipo';
                };

                const getCategoriaTexto = (tipoReq) => {
                    return tipoReq.descripcion || 'Sin categoría';
                };

                // Mapeo del requerimiento
                const requerimientoData = {
                    codigo: data.codigo,
                    prioridad: getPrioridadTexto(data.prioridad),
                    tipo: getTipoTexto(data.tipoReq),
                    categoria: getCategoriaTexto(data.tipoReq),
                    fechaAlta: new Date(data.fechaHora).toLocaleDateString(),
                    estado: getEstadoTexto(data.estado),
                    asunto: data.asunto,
                    descripcion: data.descripcion,
                    propietario: data.idUser ? `Usuario ${data.idUser}` : 'Sin propietario',
                    fechaCreacion: new Date(data.createdAt).toLocaleString(),
                    fechaActualizacion: new Date(data.updatedAt).toLocaleString()
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