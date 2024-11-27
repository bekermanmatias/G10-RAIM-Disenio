import React, { useState, useEffect } from 'react';
import { 
    Box, 
    VStack, 
    Text, 
    Heading, 
    Button, 
    Flex, 
    Container, 
    Grid, 
    GridItem,
    Spinner,
    Alert,
    AlertIcon,
    Avatar,
    Center,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContainer from './UserContainer'; 
import CustomButton from '../../utils/CustomButton';

const UserDetail = () => {
    const { nombreUsuario } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate('/users');
    };

    // Cargar datos del usuario solo una vez
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/user/${nombreUsuario}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                const data = await response.json();

                // Mapeo de datos
                const mappedData = {
                    id: data.idUsuario,
                    nombreCompleto: data.nombre,
                    usuario: data.nombreUsuario,
                    email: data.email,
                    cargo: data.cargo,
                    legajo: data.legajo,
                    departamento: data.nombreDepa.nombre,
                    fechaIngreso: data.createdAt,
                };

                setUsuario(mappedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [nombreUsuario]);

    // Loading state
    if (loading) {
        return (
            <Container centerContent>
                <Spinner 
                    size="xl" 
                    color="blue.900" 
                    thickness="4px" 
                    speed="0.65s" 
                    emptyColor="gray.200"
                />
            </Container>
        );
    }

    // Error state
    if (error) {
        return (
            <Container centerContent>
                <Alert status="error">
                    <AlertIcon />
                    Error: {error} 
                </Alert>
            </Container>
        );
    }

    // Not found state
    if (!usuario) {
        return (
            <Container centerContent>
                <Alert status="warning">
                    <AlertIcon />
                    Usuario no encontrado
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" p={8}>
            <Flex 
                justifyContent="space-between" 
                alignItems="center" 
                mb={8}
            >
                <Heading 
                    color="blue.900" 
                    size="xl"
                >
                    Usuario: {nombreUsuario}
                </Heading>
            </Flex>
    
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {/* Sección de Perfil */}
                <GridItem colSpan={2}>
                    <Center height="full">
                        <Box 
                            width="full" 
                            border="1px" 
                            borderColor="gray.200" 
                            borderRadius="md" 
                            p={6} 
                            textAlign="center"
                        >
                            < Avatar 
                                size="2xl" 
                                name={usuario.nombreCompleto} 
                                mb={4}
                            />
                            <Heading size="lg" mb={2} color="blue.900">
                                {usuario.nombreCompleto}
                            </Heading>
                            <Text color="gray.500" mb={4}>
                                {usuario.usuario}
                            </Text>
                        </Box>
                    </Center>
                </GridItem>

                {/* Información Personal */}
                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Correo Electrónico</FormLabel>
                        <Input 
                            value={usuario.email}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Legajo</FormLabel>
                        <Input 
                            value={usuario.legajo}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Cargo</FormLabel>
                        <Input 
                            value={usuario.cargo}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Departamento</FormLabel>
                        <Input 
                            value={usuario.departamento}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Fecha de Ingreso</FormLabel>
                        <Input 
                            value={usuario.fechaIngreso}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                {/* Última conexión */}
                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Última Conexión</FormLabel>
                        <Input 
                            value="2023-10-01 12:00:00" // Valor hardcodeado
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>
            </Grid>
    
            <Flex justifyContent="flex-start" mt={6}>
                <CustomButton 
                    onClick={handleBack} 
                    variant="apply" 
                >
                    ← Volver
                </CustomButton>
            </Flex>
        </Container>
    );
};

export default UserDetail;