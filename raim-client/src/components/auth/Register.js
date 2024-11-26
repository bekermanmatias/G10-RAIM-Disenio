import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Heading,
    Container,
    Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api'; 
import CustomButton from '../../utils/CustomButton';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        cargo: '',
        department: ''
    });

    const navigate = useNavigate();

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
            const response = await api.register(formData); // Asegúrate de que la función register esté definida en tu API
            if (response.status === 200) {
                console.log('Registro exitoso');
                navigate('/login'); // Redirigir al inicio de sesión después del registro
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    const handleCancel = () => {
        navigate('/login'); // Redirigir al inicio de sesión al cancelar
    };

    return (
        <Container maxW="container.md" mt={10}>
            <Box p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
                <Heading as="h2" size="lg" mb={4}>
                    Registro
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Nombre Completo</FormLabel>
                        <Input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
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
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu nombre de usuario"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Cargo</FormLabel>
                        <Input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            placeholder="Ingresa tu cargo"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>Departamento</FormLabel>
                        <Select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Selecciona un departamento"
                        >
                            <option value="tecnologia">Tecnología</option>
                            <option value="marketing">Marketing</option>
                            <option value="ventas">Ventas</option>
                            <option value="rrhh">Recursos Humanos</option>
                            {/* Agrega más departamentos según sea necesario */}
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
    );
};

export default Register;