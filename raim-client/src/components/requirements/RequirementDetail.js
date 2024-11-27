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
    Alert,
    AlertIcon,
    Spinner,
    HStack
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import RequirementContainer from './RequirementContainer';
import CustomButton from '../../utils/CustomButton';

const RequirementDetail = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();
    const [requerimiento, setRequerimiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate('/requirements');
    };

    if (loading) {
        return (
            <Container centerContent>
                <RequirementContainer 
                    codigo={codigo} 
                    setRequerimiento={setRequerimiento} 
                    setLoading={setLoading} 
                    setError={setError} 
                />
                <Spinner 
                    size ="xl" 
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
                <RequirementContainer 
                    codigo={codigo} 
                    setRequerimiento={setRequerimiento} 
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

    if (!requerimiento) {
        return (
            <Container centerContent>
                <RequirementContainer 
                    codigo={codigo} 
                    setRequerimiento={setRequerimiento} 
                    setLoading={setLoading} 
                    setError={setError} 
                />
                <Alert status="warning">
                    <AlertIcon />
                    Requerimiento no encontrado
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
                    Detalle Requerimiento: {codigo}
                </Heading>
            </Flex>
    
            <Grid templateColumns="2fr 1fr" gap={8}>
                <GridItem>
                    <VStack align="start" spacing={6} width="full">
                        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="full">
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Estado</Heading>
                                <Text>{requerimiento.estado}</Text>
                            </GridItem>
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Prioridad</Heading>
                                <Text>{requerimiento.prioridad}</Text>
                            </GridItem>
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Tipo</Heading>
                                <Text>{requerimiento.tipo}</Text>
                            </GridItem>
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Categoría</Heading>
                                <Text>{requerimiento.categoria}</Text>
                            </GridItem>
                        </Grid>
    
                        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="full">
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Emisor</Heading>
                                <Text>{requerimiento.emisor}</Text>
                            </GridItem>
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Propietario</Heading>
                                <Text>{requerimiento.propietario}</Text>
                            </GridItem>
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Fecha de Alta</Heading>
                                <Text>{requerimiento.fechaCreacion}</Text>
                            </GridItem>
                            <GridItem>
                                <Heading size="sm" mb={2} color="blue.900">Última Actualización</Heading>
                                <Text>{requerimiento.fechaActualizacion}</Text>
                            </GridItem>
                        </Grid>
                        
                        <Box width="full">
                            <Heading size="md" mb={3} color="blue.900">Asunto</Heading>
                            <Text 
                                bg="gray.100" 
                                p={3} 
                                borderRadius="md" 
                                width="full"
                            >
                                {requerimiento.asunto}
                            </Text>
                        </Box>
    
                        <Box width="full">
                            <Heading size="md" mb={3} color="blue.900">Descripción</Heading>
                            <Text 
                                bg="gray.100" 
                                p={3} 
                                borderRadius="md" 
                                width="full" 
                                minHeight="150px"
                            >
                                {requerimiento.descripcion}
                            </Text>
                        </Box>
                    </VStack>
                </GridItem>
    
                <GridItem>
                    <Box width="full">
                        <Heading size="md" mb={4} color="blue.900">Comentarios</Heading>
                        <VStack spacing={4} width="full" align="stretch">
                            <Box 
                                border="1px" 
                                borderColor="gray.200" 
                                borderRadius="md" 
                                p={4} 
                                bg="white"
                            >
                                <Flex justifyContent="space-between" mb={2}>
                                    <HStack>
                                        <Text fontWeight="bold" color="blue.900">Juan Pérez</Text>
                                        <Text color="gray.500" fontSize="sm">
                                            12 de Julio, 2023 - 14:30
                                        </Text>
                                    </HStack>
                                </Flex>
                                
                                <Box>
                                    <Heading size="xs" mb={2} color="gray.700">
                                        Seguimiento de Requerimiento
                                    </Heading>
                                    <Text color="gray.900">
                                        Se requiere más información sobre los detalles técnicos del problema reportado. 
                                        Por favor, proporcionar especificaciones detalladas del equipo o sistema afectado.
                                    </Text>
                                </Box>
                            </Box>
    
                            <Box 
                                border="1px" 
                                borderColor="gray.200" 
                                borderRadius="md" 
                                p={4} 
                                bg="white"
                            >
                                <Flex justifyContent="space-between" mb={2}>
                                    <HStack>
                                        <Text fontWeight="bold" color="blue.900">María González</Text>
                                        <Text color="gray.500" fontSize="sm">
                                            13 de Julio, 2023 - 09:15
                                        </Text>
                                    </HStack>
                                </Flex>
                                
                                <Box>
                                    <Heading size="xs" mb={2} color="gray.700">
                                        Respuesta al Seguimiento
                                    </Heading>
                                    <Text color="gray.900">
                                        Adjuntaré un informe técnico con los detalles solicitados. 
                                        El equipo está presentando problemas de conectividad en la red local.
                                    </Text>
                                </Box>
                            </Box>
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>
    
            <Flex justifyContent="flex-start" mt={6}>
                <CustomButton 
                    onClick={handleBack} 
                    variant="apply" 
                    width="100px" 
                >
                    ← Volver
                </CustomButton>
            </Flex>
        </Box>
    );
};

export default RequirementDetail;