import React, { useEffect, useState } from 'react';
import {
    Box,
    VStack,
    Text,
    Heading,
    Flex,
    Container,
    Grid,
    GridItem,
    Avatar,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../utils/CustomButton';
import { useAuth } from '../../context/authContext';

const Settings = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [userData, setUserData] = useState({
        nombre: '',
        email: '',
        legajo: '',
        nombreUsuario: '',
        cargo: '',
        departamento: '',
        fechaIngreso: '',
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const nombreUsuario = String(localStorage.getItem('usuario'));
    if (!nombreUsuario) {
        navigate('/login');
    }

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses inician en 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    };
  

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://g10-raim-disenio.onrender.com/api/user/${nombreUsuario}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del usuario');
                }
                const data = await response.json();
                const mappedData = {
                    idUsuario: data.idUsuario,
                    nombre: data.nombre,
                    nombreUsuario: data.nombreUsuario,
                    email: data.email,
                    cargo: data.cargo,
                    legajo: data.legajo,
                    departamento: data.nombreDepa.nombre,
                    fechaIngreso: data.createdAt,
                };
                setUserData(mappedData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [nombreUsuario, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
                        name={userData.nombreUsuario}
                        mb={4}
                    />
                    <Heading
                        size={{ base: "md", md: "lg" }}
                        mb={2}
                        color="blue.900"
                    >
                        {userData.nombreUsuario}
                    </Heading>
                    <Text color="gray.500" mb={4}>
                        {userData.username} {/* Ajusta este campo según corresponda */}
                    </Text>
                </Box>

                {/* User Details Grid */}
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={{ base: 4, md: 6 }}
                >
                    <GridItem>
                        <FormControl isReadOnly>
                            <FormLabel color="blue.900">Nombre Completo</FormLabel>
                            <Input
                                value={userData.nombre}
                                isReadOnly
                                bg="gray.100"
                                color="gray.600"
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl isReadOnly>
                            <FormLabel color="blue.900">Correo Electrónico</FormLabel>
                            <Input
                                value={userData.email}
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
                                value={userData.legajo}
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
                                value={userData.cargo}
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
                                value={userData.departamento}
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
                                value={formatDate(userData.fechaIngreso)}
                                isReadOnly
                                bg="gray.100"
                                color="gray.600"
                            />
                        </FormControl>
                    </GridItem>
                </Grid>

                <Flex justifyContent={{ base: "center", md: "flex-end" }} mt={4}>
                    <CustomButton
                        onClick={onOpen}
                        variant="delete"
                        width={{ base: "100%", md: "auto" }}
                        ml={{ base: 0, md: 4 }}
                    >
                        Cerrar Sesión
                    </CustomButton>
                </Flex>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirmar Cierre de Sesión</ModalHeader>
                        <ModalBody>
                            ¿Estás seguro de que deseas cerrar sesión?
                        </ModalBody>
                        <ModalFooter>
                            <CustomButton variant="cancel" onClick={onClose}>
                                Cancelar
                            </CustomButton>
                            <CustomButton variant="delete" onClick={handleLogout} ml={3}>
                                Confirmar
                            </CustomButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Stack>
        </Container>
    );
};

export default Settings;
