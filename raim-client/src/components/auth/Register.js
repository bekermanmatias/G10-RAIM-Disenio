import React, { useState, useEffect } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Heading,
    Container,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'; // Añadir esta importación
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api'; 
import CustomButton from '../../utils/CustomButton';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        nombreUsuario: '',
        password: '',
        cargo: '',
        legajo: '',
        nombreDepartamento: ''
    });

    const [showPassword, setShowPassword] = useState(false); // Añadir estado para mostrar/ocultar contraseña
    const [departments, setDepartments] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('https://g10-raim-disenio.onrender.com/api/departamento');
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(data);
                } else {
                    console.error('Error al obtener los departamentos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los departamentos:', error);
            }
        };

        fetchDepartments();
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await fetch(`https://g10-raim-disenio.onrender.com/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)});
            console.log(response.status);
            if (response.status === 201) {
                console.log('Registro exitoso');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    const handleCancel = () => {
        navigate('/login');
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="84vh" bg="gray.100">
            <Container maxW="container.md" mt={10}>
                <Box p={6} bg="white" borderWidth={1} borderRadius="md" boxShadow="lg">
                    <Heading as="h2" size="lg" mb={4}>
                        Registro
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Nombre Completo</FormLabel>
                            <Input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre completo"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu correo electrónico"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Nombre de Usuario</FormLabel>
                            <Input
                                type="text"
                                name="nombreUsuario"
                                value={formData.nombreUsuario}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre de usuario"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <Box position="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu contraseña"
                                />
                                <IconButton
                                    position="absolute"
                                    right="0"
                                    top="50%"
                                    transform="translateY(-50%)"
                                    variant="link"
                                    onClick={() => setShowPassword(!showPassword)}
                                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                />
                            </Box>
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Cargo</FormLabel>
                            <Input
                                type=" text"
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                placeholder="Ingresa tu cargo"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Legajo</FormLabel>
                            <Input
                                type=" text"
                                name="legajo"
                                value={formData.legajo}
                                onChange={handleChange}
                                placeholder="Ingresa tu legajo"
                            />
                        </FormControl>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Departamento</FormLabel>
                            <Select
                                name="nombreDepartamento"
                                value={formData.nombreDepartamento}
                                onChange={handleChange}
                                placeholder="Selecciona un departamento"
                            >
                                {departments.map((department) => (
                                    <option key={department.idDepartamento} value={department.nombre}>
                                        {department.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <Flex justifyContent="flex-end" mt={4}>
                            <CustomButton 
                                variant="cancel" 
                                onClick={handleCancel} 
                                width="100px"
                                mr={2}
                            >
                                Cancelar
                            </CustomButton>
                            <CustomButton 
                                variant="apply" 
                                type="submit" 
                                width="100px"
                            >
                                Registrarse
                            </CustomButton>
                        </Flex>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;