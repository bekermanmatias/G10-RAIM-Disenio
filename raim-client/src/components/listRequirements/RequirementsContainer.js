// src/components/listRequirements/components/RequirementsContainer.js
import React, { useState, useEffect } from 'react';
import TableRequirements from './components/TableRequirements';


const RequirementsContainer = ({ setFilteredRequirements, setRequerimientosData, setLoading, setError }) => {
  const [requirements, setRequirements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRequirements = async () => {
      setLoading(true);
      try {
        // Usamos limit=13 según lo que configuraste en el backend
        const response = await fetch(`https://g10-raim-disenio.onrender.com/api/requirement?page=${currentPage}&limit=13`);
        if (!response.ok) {
          throw new Error('Error al obtener los requerimientos');
        }
        const data = await response.json();

        // Mapear los requerimientos para adaptar la estructura al TableRequirements
        const requerimientosData = data.requirements.map(req => ({
          codigo: req.codigo, 
          // Se usa la descripción de la prioridad para mostrar "Urgente", "Alta", etc.
          prioridad: req.prioridad.descripcion, 
          tipo: req.tipoReq.descripcion, 
          categoria: req.categoria.descripcion, 
          // Asumimos que req.fechaHora es la fecha de alta
          fechaAlta: req.fechaHora,
          estado: req.estado.descripcion, 
          asunto: req.asunto,
          propietario: req.idUserDetinatario ? `Usuario ${req.idUserDetinatario}` : 'Sin asignar', 
          emisor: req.idUsuarioCreador.nombreUsuario 
        }));

        // Aunque el backend ya envíe los datos ordenados, se puede ordenar adicionalmente por fecha
        requerimientosData.sort((a, b) => new Date(b.fechaAlta) - new Date(a.fechaAlta));

        // Actualizamos los estados
        setRequirements(requerimientosData);
        setFilteredRequirements(requerimientosData);
        setRequerimientosData(requerimientosData);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [currentPage, setFilteredRequirements, setRequerimientosData, setLoading, setError]);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <TableRequirements requirements={requirements} />
      <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default RequirementsContainer;
