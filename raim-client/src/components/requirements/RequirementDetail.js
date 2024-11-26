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
    Badge,
    Spinner,
    Alert,
    AlertIcon,
    HStack
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import RequirementContainer from './RequirementContainer';

const RequirementDetail = () => {
    const { codigo } = useParams();
    const navigate = useNavigate();
    const [requerimiento, setRequerimiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPriorityStyle = (prioridad) => {
        switch(prioridad) {
            case 'Urgente':
                return {
                    dotColor: '#f80505',
                    bgColor: 'rgba(231, 86, 86, 0.3)',
                    textColor: '#fc0909'
                };
            case 'Alta':
                return {
                    dotColor: '#ec5721',
                    bgColor: 'rgba(255, 116, 65, 0.2)',
                    textColor: '#f35b35'
                };
            case 'Media':
                return {
                    dotColor: '#DAA520',
                    bgColor: 'rgba(218, 165, 32, 0.2)',
                    textColor: '#B8860B'
                };
            case 'Baja':
                return {
                    dotColor: '#2E8B57',
                    bgColor: 'rgba(80, 194, 129, 0.2)',
                    textColor: '#2E8B57'
                };
            default:
                return {
                    dotColor: 'gray.500',
                    bgColor: 'gray.100',
                    textColor: 'gray.700'
                };
        }
    };

    const handleBack = () => {
        navigate('/requirements');
    };

    // Renderiza el mensaje de carga
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
                    size="xl" 
                    color="blue.900" 
                    thickness="4px" 
                    speed="0.65s" 
                    emptyColor="gray.200"
                />
            </Container>
        );
    }

    // Muestra el mensaje de error
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

    // Si no hay requerimiento después de cargar, muestra mensaje
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

    const priorityStyle = getPriorityStyle(requerimiento.prioridad);

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
                                <Flex 
                                    align="center" 
                                    bg={priorityStyle.bgColor}
                                    color={priorityStyle.textColor}
                                    px={2}
                                    py={1}
                                    borderRadius="12px"
                                    fontSize="0.9rem"
                                    fontWeight={500}
                                    width="fit-content"
                                >
                                    <Box 
                                        mr={2}
                                        width="8px"
                                        height="8px"
                                        borderRadius="50%"
                                        bg={priorityStyle.dotColor}
                                    />
                                    {requerimiento.prioridad}
                                </Flex>
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
                                    <Heading size="xs" mb={2} color="blue.900">
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
                                    <Heading size="xs" mb={2} color="blue.700">
                                        Respuesta al Seguimiento
                                    </Heading>
                                    <Text color="gray.700">
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
                <Button 
                    onClick={handleBack} 
                    colorScheme="blue"
                    variant="solid"
                    bg="blue.900"
                    _hover={{
                        bg: "blue.800"
                    }}
                >
                    ← Volver
                </Button>
            </Flex>
        </Box>
    );
};

export default RequirementDetail;