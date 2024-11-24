import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateContainer from './CreateContainer';
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
    const [users, setUsers] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
        descTipoReq: '',
        descPrioridad: '',
        asunto: '',
        descripcion: '',
        dueno: 'jperez', // Usuario actual hardcodeado por ahora
        descEstado: 'Abierto', // Estado por defecto
        descCategoria: '',
        destinatario: '',
        relacionados: '',
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
      const requiredFields = ['descTipoReq', 'descPrioridad', 'asunto', 'descripcion'];
        
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
          // Preparar los datos para enviar
          const dataToSend = {
              asunto: formData.asunto,
              descripcion: formData.descripcion,
              descEstado: formData.descEstado,
              descPrioridad: formData.descPrioridad,
              descTipoReq: formData.descTipoReq,
              dueno: formData.dueno,
              // Campos opcionales
              ...(formData.destinatario && { destinatario: formData.destinatario }),
              ...(formData.relacionados && { relacionados: formData.relacionados })
          };

          const response = await fetch('https://g10-raim-disenio.onrender.com/api/requirement', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend)
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'No se pudo crear el requerimiento');
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
          <CreateContainer 
              setUsers={setUsers} 
              setTipos={setTipos} 
              setCategorias={setCategorias} 
          />
          <h2>Agregar Nuevo Requerimiento</h2>
          <form className="requerimiento-form" onSubmit={handleSubmit}>
              <div className="form-container">
                  {/* Columna Izquierda */}
                  <div className="form-left">
                      <div className="form-row">
                          <label>Tipo</label>
                          <select 
                              name="descTipoReq" 
                              value={formData.descTipoReq} 
                              onChange={handleChange}
                          >
                              <option value="">Seleccione el Tipo</option>
                              {tipos.map(tipo => (
                                  <option key={tipo} value={tipo}>{tipo}</option>
                              ))}
                          </select>
                      </div>
                      <div className="form-row">
                          <label>Categoría</label>
                          <select 
                              name="descCategoria" 
                              value={formData.descCategoria} 
                              onChange={handleChange}
                          >
                              <option value="">Seleccione la Categoría</option>
                              {categorias.map(categoria => (
                                  <option key={categoria} value={categoria}>{categoria}</option>
                              ))}
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
                            <label>Prioridad</label>
                            <div className="radio-group">
                                {['Urgente', 'Alta', 'Media', 'Baja'].map((priority) => (
                                    <label key={priority}>
                                        <input
                                            type="radio"
                                            name="descPrioridad"
                                            value={priority}
                                            checked={formData.descPrioridad === priority}
                                            onChange={handleChange}
                                        />
                                        {priority}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="form-row">
                            <label>Destinatario (Opcional)</label>
                            <select 
                                name="destinatario" 
                                value={formData.destinatario} 
                                onChange={handleChange}
                            >
                                <option value="">Seleccione el Destinatario</option>
                                {users.map(user => (
                                    <option key={user.value} value={user.value}>
                                        {user.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-row">
                            <label>Requerimientos Relacionados</label>
                            <textarea
                                name="relacionados"
                                value={formData.relacionados}
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