import React, { useState } from 'react';
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
    Center
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContainer from './UserContainer';
import { EmailIcon, CalendarIcon, InfoIcon } from '@chakra-ui/icons';
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

    // Loading state
    if (loading) {
        return (
            <Container centerContent>
                <UserContainer 
                    nombreUsuario={nombreUsuario}
                    setUsuario={setUsuario}
                    setLoading={setLoading}
                    setError={setError} 
                />
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
                <UserContainer 
                    nombreUsuario={nombreUsuario}
                    setUsuario={setUsuario}
                    setLoading={setLoading}
                    setError={setError} 
                />
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
                <UserContainer 
                    nombreUsuario={nombreUsuario}
                    setUsuario={setUsuario}
                    setLoading={setLoading}
                    setError={setError} 
                />
                <Alert status="warning">
                    <AlertIcon />
                    Usuario no encontrado
                </Alert>
            </Container>
        );
    }

    return (
        <Box p={8}>
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
    
            <Grid templateColumns="2fr 1fr" gap={8}>
                <GridItem>
                    <VStack align="start" spacing={6} width="full">
                        <Box width="full">
                            <Heading size="md" mb={4} color="blue.900">Información Personal</Heading>
                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                <GridItem>
                                    <Heading size="sm" mb={2} color="blue.900">
                                        <EmailIcon mr={2} />
                                        Correo Electrónico
                                    </Heading>
                                    <Text>{usuario.email}</Text>
                                </GridItem>
                                <GridItem>
                                    <Heading size="sm" mb={2} color="blue.900">
                                        <InfoIcon mr={2} />
                                        Legajo
                                    </Heading>
                                    <Text>{usuario.legajo}</Text>
                                </GridItem>
                            </Grid>
                        </Box>

                        <Box width="full">
                            <Heading size="md" mb={4} color="blue.900">Información Laboral</Heading>
                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                <GridItem>
                                    <Heading size="sm" mb={2} color="blue.900">Cargo</Heading>
                                    <Text>{usuario.cargo}</Text>
                                </GridItem>
                                <GridItem>
                                    <Heading size="sm" mb={2} color="blue.900">Departamento</Heading>
                                    <Text>{usuario.departamento}</Text>
                                </GridItem>
                                <GridItem>
                                    <Heading size="sm" mb={2} color="blue.900">
                                        <CalendarIcon mr={2} />
                                        Fecha de Ingreso
                                    </Heading>
                                    <Text>{usuario.fechaIngreso}</Text>
                                </GridItem>
                            </Grid>
                        </Box>
                    </VStack>
                </GridItem>
    
                {/* Sección de Perfil */}
                <GridItem>
                    <Center height="full">
                        <Box 
                            width="full" 
                            border="1px" 
                            borderColor="gray.200" 
                            borderRadius="md" 
                            p={6} 
                            textAlign="center"
                        >
                            <Avatar 
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
            </Grid>
    
            <Flex justifyContent="flex-start" mt={6}>
                <CustomButton 
                    onClick={handleBack} 
                    variant="apply" 
                   
                >
                    ← Volver
                </CustomButton>
            </Flex>
        </Box>
    );
};

export default UserDetail;