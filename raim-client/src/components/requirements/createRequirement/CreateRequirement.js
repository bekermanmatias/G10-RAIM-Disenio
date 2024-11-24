import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CreateRequirement.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './sweetalert-custom.css';

const CrearRequerimiento = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tipo: '',
        estado: '',
        categoria: '',
        prioridad: '',
        asunto: '',
        descripcion: '',
        destinatario: '',
        relacionados: [],
        archivos: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        setFormData({
          ...formData,
          archivos: e.target.files,
        });
      };
    
      const handleCancel = () => {
        Swal.fire({
            title: 'Confirmar Cancelación',
            html: `
                <p>¿Estás seguro de que deseas abandonar la creación del requerimiento?</p>
                <small>Todos los cambios no guardados se perderán permanentemente.</small>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, descartar cambios',
            cancelButtonText: 'Continuar editando',
            background: '#f4f4f4',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/requirements');
            }
        });
    };

    const validateForm = () => {
      const fieldTranslations = {
          tipo: 'Tipo de Requerimiento',
          estado: 'Estado',
          categoria: 'Categoría',
          prioridad: 'Prioridad',
          asunto: 'Asunto',
          descripcion: 'Descripción'
      };
      
      for (let field of Object.keys(fieldTranslations)) {
          if (!formData[field] || formData[field].trim() === '') {
              Swal.fire({
                  icon: 'warning',
                  title: 'Formulario Incompleto',
                  html: `
                      <p>Por favor complete el campo: <strong>${fieldTranslations[field]}</strong></p>
                      <small>Todos los campos marcados son obligatorios para crear un requerimiento.</small>
                  `,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Entendido',
                  background: '#f4f4f4',
                  buttonsStyling: false,
                  customClass: {
                        confirmButton: 'swal2-confirm'
                  }
              });
              return false;
          }
      }
      return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    try {
        Swal.fire({
            icon: 'success',
            title: 'Requerimiento Registrado',
            text: 'El requerimiento se ha guardado exitosamente',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false, // Opcional
            showClass: {
                popup: ''  // Sin animación de entrada
            },
            hideClass: {
                popup: ''  // Sin animación de salida
            },
            buttonsStyling: false,
            customClass: {
                popup: 'professional-alert',
                confirmButton: 'swal2-confirm'
            },
            backdrop: 'rgba(0,0,0,0.2)', // Fondo semi-transparente sutil
            background: '#ffffff', // Fondo blanco limpio
            width: '380px' // Ancho personalizado
        }).then(() => {
            navigate('/requirements');
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: error.message || 'No se pudo guardar el requerimiento',
            showClass: {
                popup: ''
            },
            hideClass: {
                popup: ''
            },
            customClass: {
                popup: 'professional-alert',
        confirmButton: 'swal2-confirm'
            },
            backdrop: 'rgba(0,0,0,0.2)',
            background: '#ffffff',
            width: '380px'
        });
    }
};

      return (
        <div className="content">
        <h2>Agregar Nuevo Requerimiento</h2>
        <form className="requerimiento-form" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* Columna Izquierda */}
            <div className="form-left">
              <div className="form-row">
                <label>Tipo</label>
                <select name="tipo" value={formData.tipo} onChange={handleChange}>
                  <option value="">Seleccione el Tipo</option>
                  <option value="tipo1">Tipo 1</option>
                  <option value="tipo2">Tipo 2</option>
                </select>
              </div>
              <div className="form-row">
                <label>Categoría</label>
                <select name="categoria" value={formData.categoria} onChange={handleChange}>
                  <option value="">Seleccione la Categoría</option>
                  <option value="software">Software</option>
                  <option value="hardware">Hardware</option>
                </select>
              </div>
              <div className="form-row">
                <label>Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  maxLength="50"
                />
              </div>
              <div className="form-row">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  maxLength="5000"
                ></textarea>
              </div>
              <div className="form-row">
                <label>Archivos Adjuntos</label>
                <input type="file" name="archivos" multiple onChange={handleFileChange} />
              </div>
            </div>
      
            {/* Columna Derecha */}
            <div className="form-right">
              <div className="form-row">
                <label>Estado</label>
                <select name="estado" value={formData.estado} onChange={handleChange}>
                  <option value="">Seleccione el Estado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="completado">Completado</option>
                </select>
              </div>
              <div className="form-row">
                <label>Prioridad</label>
                <div className="radio-group">
                  {['Urgente', 'Alta', 'Media', 'Baja'].map((priority) => (
                    <label key={priority}>
                      <input
                        type="radio"
                        name="prioridad"
                        value={priority}
                        onChange={handleChange}
                      />
                      {priority}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <label>Destinatario (Opcional)</label>
                <select name="destinatario" value={formData.destinatario} onChange={handleChange}>
                  <option value="">Seleccione el Destinatario</option>
                  <option value="dest1">Destinatario 1</option>
                  <option value="dest2">Destinatario 2</option>
                </select>
              </div>
              <div className="form-row">
                <label>Requerimientos Relacionados</label>
                <textarea
                  name="requerimientosRelacionados"
                  value={formData.requerimientosRelacionados}
                  onChange={handleChange}
                  maxLength="500"
                ></textarea>
              </div>
            </div>
          </div>
      
          <div className="form-actions">
                    <button 
                        type="button" 
                        className="btn-cancel"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="btn-submit"
                    >
                        Guardar Requerimiento
                    </button>
                </div>
        </form>
      </div>
      );
    };
export default CrearRequerimiento;