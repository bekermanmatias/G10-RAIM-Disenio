import React, { useEffect, useState } from 'react';

const RequirementContainer = ({ codigo, setRequerimiento, setLoading, setError }) => {
    const [requerimientos, setRequerimientos] = useState([]);

    useEffect(() => {
        const fetchRequirementDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/requirement/${codigo}`);
                const requerimiento = await response.json();
                if (!requerimiento) {
                    throw new Error('Requerimiento no encontrado');
                }
                console.log(requerimiento);

                const requerimientoData = {
                    codigo: requerimiento.codigo,
                    prioridad: requerimiento.prioridad ? requerimiento.prioridad.descripcion : 'No disponible',
                    tipo: requerimiento.tipoReq ? requerimiento.tipoReq.descripcion : 'No disponible',
                    categoria: requerimiento.categoria ? requerimiento.categoria.descripcion : 'No disponible',
                    estado: requerimiento.estado ? requerimiento.estado.descripcion : 'No disponible',
                    asunto: requerimiento.asunto,
                    descripcion: requerimiento.descripcion,
                    propietario: requerimiento.UsuarioDestinatario && requerimiento.UsuarioDestinatario.nombre ? requerimiento.UsuarioDestinatario.nombre : 'Sin propietario',
                    fechaCreacion: new Date(requerimiento.createdAt).toLocaleString(),
                    fechaActualizacion: new Date(requerimiento.updatedAt).toLocaleString(),
                    emisor: requerimiento.idUsuarioCreador && requerimiento.idUsuarioCreador.nombre ? requerimiento.idUsuarioCreador.nombre : 'No disponible'
                };

                setRequerimiento(requerimientoData);
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };
        fetchRequirementDetail();
    }, [requerimientos, codigo, setRequerimiento, setLoading, setError]);

    return null; 
};

export default RequirementContainer;