import React, { useState } from 'react';
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
    Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../utils/CustomButton';

const Settings = () => {
    const navigate = useNavigate();
    const [userData] = useState({
        fullName: 'Juan Pérez',
        email: 'juan.perez@empresa.com',
        legajo: '12345',
        username: 'juanperez',
        cargo: 'Desarrollador Senior',
        department: 'Tecnología'
    });

    const handleBack = () => {
        navigate('/previousPage'); // Cambia esto a la ruta que desees
    };

    return (
        <Container maxW="container.xl">
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
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Nombre Completo</FormLabel>
                        <Input 
                            name="fullName"
                            value={userData.fullName}
                            isReadOnly
                            bg="gray.100"
                            color="gray.600"
                        />
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isReadOnly>
                        <FormLabel color="blue.900">Nombre de Usuario</FormLabel>
                        <Input 
                            name="username"
                            value={userData.username}
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

            <Flex justifyContent="flex-start" mt={4}>
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

export default Settings;