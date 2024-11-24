import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!username || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      // Ejemplo de llamada a API de autenticación
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token de autenticación
        localStorage.setItem('authToken', data.token);
        
        // Redirigir al dashboard o página principal
        navigate('/dashboard');
      } else {
        // Manejar errores de inicio de sesión
        setError(data.message || 'Error de inicio de sesión');
      }
    } catch (err) {
      setError('Error de conexión. Intente nuevamente.');
      console.error('Error de inicio de sesión:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Iniciar Sesión</h2>
          
          {error && <div className="login-error">{error}</div>}
          
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          
          <div className="login-input-group">
            <label htmlFor="password" className="login-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          
          <div className="login-actions">
            <button type="submit" className="login-submit-btn">
              Iniciar Sesión
            </button>
          </div>
          
          <div className="login-links">
            <Link to="/registro" className="login-link">
              Registrarse
            </Link>
            <Link to="/recuperar-password" className="login-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;