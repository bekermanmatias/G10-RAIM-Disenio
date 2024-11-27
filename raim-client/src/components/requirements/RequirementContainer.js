import React, { useEffect, useState } from 'react';

const RequirementContainer = ({ codigo, setRequerimiento, setLoading, setError }) => {
    const [requerimientos, setRequerimientos] = useState([]);

    useEffect(() => {
        const fetchRequirements = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://g10-raim-disenio.onrender.com/api/requirement');
                if (!response.ok) {
                    throw new Error('Error al obtener los requerimientos');
                }
                const data = await response.json();
                setRequerimientos(data); // Guardar todos los requerimientos en el estado
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequirements();
    }, [setLoading, setError]);

    useEffect(() => {
        const fetchRequirementDetail = () => {
            setLoading(true);
            try {
                // Filtrar el requerimiento por código
                const requerimiento = requerimientos.find(req => req.codigo === codigo);
                
                if (!requerimiento) {
                    throw new Error('Requerimiento no encontrado');
                }

                const getPrioridadTexto = (prioridad) => prioridad.descripcion || 'Sin prioridad';
                const getEstadoTexto = (estado) => estado.descripcion || 'Sin estado';
                const getTipoTexto = (tipoReq) => tipoReq.descripcion || 'Sin tipo';
                const getCategoriaTexto = (categoria) => categoria.descripcion || 'Sin categoría';

                // Mapeo del requerimiento
                const requerimientoData = {
                    codigo: requerimiento.codigo,
                    prioridad: getPrioridadTexto(requerimiento.prioridad),
                    tipo: getTipoTexto(requerimiento.tipoReq),
                    categoria: getCategoriaTexto(requerimiento.categoria),
                    estado: getEstadoTexto(requerimiento.estado),
                    asunto: requerimiento.asunto,
                    descripcion: requerimiento.descripcion,
                    propietario: requerimiento.idUserDestinatario ? `Usuario ${requerimiento.idUserDestinatario}` : 'Sin propietario',
                    fechaCreacion: new Date(requerimiento.createdAt).toLocaleString(),
                    fechaActualizacion: new Date(requerimiento.updatedAt).toLocaleString(),
                    emisor: requerimiento.idUsuarioCreador.nombre 
                };

                setRequerimiento(requerimientoData);
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        if (requerimientos.length > 0) {
            fetchRequirementDetail();
        }
    }, [requerimientos, codigo, setRequerimiento, setLoading, setError]);

    return null; 
};

export default RequirementContainer;