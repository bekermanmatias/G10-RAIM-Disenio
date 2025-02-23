import React, { useEffect, useState } from 'react';
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
        departamento: ''
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const nombreUsuario = String(localStorage.getItem('usuario'));
    if (!nombreUsuario) {
        navigate('/login');
    }

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

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`https://g10-raim-disenio.onrender.com/api/user/${nombreUsuario}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la cuenta');
            }

            localStorage.removeItem('usuario');
            logout();
            navigate('/register');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
            <Stack spacing={6}>
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
                        {userData.username}
                        {userData.username} {/* Ajusta este campo según corresponda */}
                    </Text>
                </Box>

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

                </Grid>

                <Flex justifyContent="flex-end" mt={4}>
                <CustomButton onClick={onDeleteOpen} variant="danger">
                        Eliminar Cuenta
                    </CustomButton>
                    <CustomButton onClick={onOpen} variant="delete" ml={4}>
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

                <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirmar Eliminación de Cuenta</ModalHeader>
                        <ModalBody>
                            ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
                        </ModalBody>
                        <ModalFooter>
                            <CustomButton variant="cancel" onClick={onDeleteClose}>
                                Cancelar
                            </CustomButton>
                            <CustomButton variant="danger" onClick={handleDeleteAccount} ml={3}>
                                Eliminar
                            </CustomButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Stack>
        </Container>
    );
};

export default Settings;
