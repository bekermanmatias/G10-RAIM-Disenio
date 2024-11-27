import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Heading, 
    FormControl, 
    FormLabel, 
    Input, 
    Grid, 
    GridItem, 
    Container,
    Flex,
    Avatar,
    Center,
    Text,
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
                console.log(error.message);
                console.log(error);
            }
        };

        fetchUserData();
    });

    const handleBack = () => {
        navigate('/requirements'); 
    };

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    };

    return (
        <Container maxW="container.xl" p={8}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
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
                            <Avatar 
                                size="2xl" 
                                name={userData.nombreUsuario} 
                                mb={4}
                            />
                            <Heading size="lg" mb={2} color="blue.900">
                                {userData.nombreUsuario}
                            </Heading>
                            <Text color="gray.500" mb={4}>
                                {userData.username}
                            </Text>
                        </Box>
                    </Center>
                </GridItem>
                
                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Nombre Completo</FormLabel>
                        <Input 
                            name="nombre"
                            value={userData.nombre}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Nombre de Usuario </FormLabel>
                        <Input 
                            name="nombreUsuario"
                            value={userData.nombreUsuario}
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
                            name="email"
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
                            name="legajo"
                            value={userData.legajo}
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
                            name="departamento"
                            value={userData.departamento}
                            isReadOnly
                            bg=" gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Cargo</FormLabel>
                        <Input 
                            name="cargo"
                            value={userData.cargo}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>
            </Grid>  

            <Flex justifyContent="flex-end" mt={4}>

                <CustomButton 
                    onClick={onOpen} 
                    variant="delete" 
                    ml={4}
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
        </Container>
    );
};

export default Settings;