import React, { useState, useEffect } from 'react';
import './Login.css';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';


const Login = () => {
  const [usuario, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const { login }= useAuth(); 

useEffect(() => {
  if (String(localStorage.getItem('isAuthenticated')) === 'true'){
    console.log('Navigating to /requirement...');
    navigate('/requirements');
    window.location.reload();
  };
})
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const credentials = {
            usuario,
            password
        }

      const response = await api.login(credentials);
      if (response.status === 200) {
        const { token } = response.data;
        const set_local_storage_res = login(token, usuario); 
        if (set_local_storage_res){
            console.log('Navigating to /requirement...');
            navigate('/requirements');
            window.location.reload();
        }
    }
    }
    catch(error) {
      console.error('Error logging in:', error);
      throw new Error('Credenciales invalidas', error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src="/assets/icons/logo.svg" alt="Logo" />
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Correo electrónico o Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={usuario}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Ingresa tu email o usuario"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="forgot-password">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="forgot-password">
          <a href="/register">Registrarse</a>
        </div>
        <button type="submit" className="login-btn">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
