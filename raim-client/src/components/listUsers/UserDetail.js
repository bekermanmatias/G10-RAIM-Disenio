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
    Center,
    FormControl,
    FormLabel,
    Input,
    Stack
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
        <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
            <Stack spacing={6}>
                {/* Profile Header */}
                <Box 
                    width="full" 
                    border="1px" 
                    borderColor="gray.200" 
                    borderRadius="md" 
                    p={{ base: 4, md: 6 }} 
                    textAlign="center"
                >
                    <Avatar 
                        size={{ base: "xl", md: "2xl" }} 
                        name={usuario.nombreCompleto} 
                        mb={4}
                    />
                    <Heading 
                        size={{ base: "md", md: "lg" }} 
                        mb={2} 
                        color="blue.900"
                    >
                        {usuario.nombreCompleto}
                    </Heading>
                    <Text color="gray.500" mb={4}>
                        {usuario.usuario}
                    </Text>
                </Box>

                {/* User Details Grid */}
                <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
                    gap={{ base: 4, md: 6 }}
                >
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

                    <GridItem>
                        <FormControl isReadOnly>
                            <FormLabel color="blue.900">Última Conexión</FormLabel>
                            <Input 
                                value={usuario.fechaIngreso}
                                isReadOnly
                                bg="gray.100"
                                color="gray.600"
                            />
                        </FormControl>
                    </GridItem>
                </Grid>

                {/* Back Button */}
                <Flex justifyContent="flex-end">
                    <CustomButton 
                        onClick={handleBack} 
                        variant="apply"
                        width={{ base: '100%', md: '20%' }}
                    >
                        ← Volver
                    </CustomButton>
                </Flex>
            </Stack>
        </Container>
    );
};

export default UserDetail;