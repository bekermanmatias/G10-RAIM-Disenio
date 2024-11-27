import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import CustomButton from '../../utils/CustomButton';
import { Link } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Redirigir si ya está autenticado
    if (String(localStorage.getItem('isAuthenticated')) === 'true') {
      navigate('/requirements');
    }
  }, [navigate]);

  const validateForm = () => {
    if (!usuario || !password) {
      setError('Por favor, completa todos los campos.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar recarga de página
    if (!validateForm()) return; // Validar el formulario antes de enviar
    setLoading(true);
    setError(''); // Limpiar el error antes de intentar iniciar sesión

    try {
      const credentials = {
        usuario,
        password,
      };

      const response = await api.login(credentials);

      // Asegúrate de que la respuesta tenga el formato esperado
      if (response && response.status === 200) {
        const { token } = response.data;
        const set_local_storage_res = login(token, usuario);
        if (set_local_storage_res) {
          console.log('Navigating to /requirements...');
          navigate('/requirements'); // Redirigir a la página de requerimientos
        }
      } else {
        // Si la respuesta no es 200, se considera un error
        setError('Credenciales inválidas'); // Mantener el error visible
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Credenciales inválidas'); // Mensaje de error específico
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="84vh" bg="gray.100">
      <Box flex="1" display="flex" alignItems="center" justifyContent="center" p={4}>
        <VStack
          spacing={4}
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          width="90%"
          maxWidth="400px"
        >
          <Heading size="lg">Bienvenido a RAIM</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Usuario:</FormLabel>
              <Input
                type="text"
                id="username"
                value={usuario}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel htmlFor="password">Contraseña:</FormLabel>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </FormControl>
            <CustomButton
              mt={6}
              type="submit"
              isLoading={loading}
              loadingText="Iniciando..."
              width="full"
              variant="apply"
            >
              Iniciar sesión
            </CustomButton>
          </form>
          <Link to="/forgot-password" style={{ color: 'blue.500' }}>
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/register" style={{ color: 'blue.500' }}>
            <CustomButton variant="link">Registrarse</CustomButton>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;