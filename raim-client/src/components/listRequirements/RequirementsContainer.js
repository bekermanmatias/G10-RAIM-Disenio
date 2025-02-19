import React, { useState, useEffect } from 'react';

const RequirementsContainer = ({ setFilteredRequirements, setRequerimientosData, setLoading, setError }) => {


    const [ requirements, setRequirements ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);

    useEffect(() => {
        const fetchRequirements = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/requirement?page=${currentPage}&limit=50`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener los requerimientos');
                }
                const data = await response.json();
                setRequirements(data.requirements);
                setTotalPages(data.totalPages);

                const requerimientosData = data.map(req => ({
                    codigo: req.codigo, 
                    prioridad: req.prioridad.descripcion, 
                    tipo: req.tipoReq.descripcion, 
                    categoria: req.categoria.descripcion, 
                    fechaAlta: req.fechaHora,
                    estado: req.estado.descripcion, 
                    asunto: req.asunto,
                    propietario: req.idUserDetinatario ? `Usuario ${req.idUserDetinatario}` : 'Sin asignar', 
                    emisor: req.idUsuarioCreador.nombreUsuario 
                }));

                requerimientosData.sort((a, b) => new Date(b.fechaAlta) - new Date(a.fechaAlta));

                setFilteredRequirements(requerimientosData);
                setRequerimientosData(requerimientosData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequirements();
    }, [ currentPage, setFilteredRequirements, setRequerimientosData, setLoading, setError]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
      };

    return null;
};

export default RequirementsContainer;