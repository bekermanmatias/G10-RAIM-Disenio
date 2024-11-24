import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRequirement.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './sweetalert-custom.css';
import { 
    showConfirmCancelAlert, 
    showFormValidationAlert, 
    showSuccessAlert, 
    showErrorAlert 
} from '../../../utils/sweetalert-utils';

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
        showConfirmCancelAlert(() => navigate('/requirements'));
    };

    const validateForm = () => {
        const requiredFields = ['tipo', 'estado', 'categoria', 'prioridad', 'asunto', 'descripcion'];
        
        for (let field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                showFormValidationAlert(field);
                return false;
            }
        }
        return true;
    };

    const createRequirement = async () => {
        try {
            // Aquí va la lógica de crear requerimiento
            // Por ejemplo:
            const response = await fetch('tu-url-de-api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('No se pudo crear el requerimiento');
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            await createRequirement();
            showSuccessAlert(() => navigate('/requirements'));
        } catch (error) {
            showErrorAlert(error.message);
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