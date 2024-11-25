import React, { useEffect } from 'react';

const RequirementContainer = ({ codigo, setRequerimiento, setLoading, setError }) => {
    useEffect(() => {
        const fetchRequirementDetail = async () => {
            setLoading(true); 
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/requirement/${codigo}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el requerimiento');
                }
                const data = await response.json();
                
                const getPrioridadTexto = (prioridad) => prioridad.descripcion || 'Sin prioridad';
                const getEstadoTexto = (estado) => estado.descripcion || 'Sin estado';
                const getTipoTexto = (tipoReq) => tipoReq.descripcion || 'Sin tipo';
                const getCategoriaTexto = (categoria) => categoria.nombre || 'Sin categoría';

                // Mapeo del requerimiento
                const requerimientoData = {
                    codigo: data.codigo,
                    prioridad: getPrioridadTexto(data.prioridad),
                    tipo: getTipoTexto(data.tipoReq),
                    categoria: getCategoriaTexto(data.categoria),
                    estado: getEstadoTexto(data.estado),
                    asunto: data.asunto,
                    descripcion: data.descripcion,
                    propietario: data.idUserDetinatario ? `Usuario ${data.idUserDetinatario}` : 'Sin propietario',
                    fechaCreacion: new Date(data.createdAt).toLocaleString(),
                    fechaActualizacion: new Date(data.updatedAt).toLocaleString(),
                    emisor: data.idUsuarioCreador.nombre 
                };

                setRequerimiento(requerimientoData);
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchRequirementDetail();
    }, [codigo, setRequerimiento, setLoading, setError]);

    return null; 
};

export default RequirementContainer;