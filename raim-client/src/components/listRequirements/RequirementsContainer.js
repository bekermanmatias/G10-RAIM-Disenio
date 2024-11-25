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

                // Mapeo de requerimientos
                const requerimientosData = data.map(req => ({
                    codigo: req.codigo,
                    prioridad: req.prioridad.descripcion, 
                    tipo: req.tipoReq.descripcion, 
                    categoria: req.categoria.nombre, 
                    fechaAlta: req.fechaHora.split('T')[0], 
                    estado: req.estado.descripcion,
                    asunto: req.asunto,
                    propietario: req.idUserDetinatario ? `Usuario ${req.idUserDetinatario}` : 'Sin asignar', 
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

    return null;
};

export default RequirementsContainer;