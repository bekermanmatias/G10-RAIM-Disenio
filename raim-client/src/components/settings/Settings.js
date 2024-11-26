import React, { useState } from 'react';
import { 
    Box, 
    Heading, 
    FormControl, 
    FormLabel, 
    Input, 
    Button, 
    Grid, 
    GridItem, 
    Container,
    FormHelperText,
    Flex,
    Avatar,
    Center,
    Text
} from '@chakra-ui/react';

const Settings = () => {
    const [userData, setUserData] = useState({
        fullName: 'Juan Pérez',
        email: 'juan.perez@empresa.com',
        legajo: '12345',
        username: 'juanperez',
        cargo: 'Desarrollador Senior',
        department: 'Tecnología'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating user data:', userData);
        // Implementar lógica de actualización
    };

    const handleChangePassword = () => {
        // Lógica para cambiar contraseña (por implementar)
        console.log('Cambiar contraseña');
    };

    return (
        <Container maxW="container.xl">
            

            <form onSubmit={handleSubmit}>
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
                                <Avatar 
                                    size="2xl" 
                                    name={userData.fullName} 
                                    mb={4}
                                />
                                <Heading size="lg" mb={2} color="blue.900">
                                    {userData.fullName}
                                </Heading>
                                <Text color="gray.500" mb={4}>
                                    {userData.username}
                                </Text>
                            </Box>
                        </Center>
                    </GridItem>
                
                    {/* Columna Izquierda */}
                    <GridItem>
                        <FormControl>
                            <FormLabel color="blue.900">Nombre Completo</FormLabel>
                            <Input 
                                name="fullName"
                                value={userData.fullName}
                                onChange={handleInputChange}
                                borderColor="blue.600"
                                _hover={{ borderColor: 'blue.900' }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel color="blue.900">Nombre de Usuario</FormLabel>
                            <Input 
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                                borderColor="blue.600"
                                _hover={{ borderColor: 'blue.900' }}
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

                    {/* Columna Derecha */}
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
                                name="department"
                                value={userData.department}
                                isReadOnly
                                bg="gray.100"
                                color="gray.600"
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl>
                            <FormLabel color="blue.900">Cargo</FormLabel>
                            <Input 
                                name="cargo"
                                value={userData.cargo}
                                onChange={handleInputChange}
                                borderColor="blue.600"
                                _hover={{ borderColor: 'blue.900' }}
                            />
                        </FormControl>
                    </GridItem>

                    </Grid>  

                <Flex justifyContent="flex-end" mt={4}>
                    <Button 
                        onClick={handleChangePassword}
                        variant="outline"
                        colorScheme="blue"
                        mr={4}
                    >
                        Cambiar Contraseña
                    </Button>
                    <Button 
                        type="submit"
                        colorScheme="blue"
                        bg="blue.900"
                        color="white"
                        _hover={{
                            bg: "blue.800"
                        }}
                    >
                        Guardar Cambios
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};

export default Settings;