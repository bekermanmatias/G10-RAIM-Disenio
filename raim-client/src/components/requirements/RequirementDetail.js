// src/components/listRequirements/filters/RequirementDetail.js
import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Heading, 
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
import '../../components/listRequirements/components/TableRequirements.css';
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

  const getPriorityStyle = (prioridad) => {
    switch(prioridad) {
      case 'Urgente':
        return 'priority-urgent';
      case 'Alta':
        return 'priority-high';
      case 'Media':
        return 'priority-medium';
      case 'Baja':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Flex 
        justifyContent="space-between" 
        alignItems="center" 
        mb={8}
        direction={{ base: 'column', md: 'row' }}
      >
        <Heading 
          color="blue.900" 
          size={{ base: 'lg', md: 'xl' }}
          mb={{ base: 4, md: 0 }}
        >
          {codigo}
        </Heading>
      </Flex>

      <Grid 
        templateColumns={{ base: '1fr', md: '2fr 1fr' }} 
        gap={8}
      >
        <GridItem>
          <VStack align="start" spacing={6} width="full">
            {/* Primer grupo de datos */}
            <Grid 
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} 
              gap={4} 
              width="full"
            >
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Estado
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'md' }}>
                  {requerimiento.estado}
                </Text>
              </GridItem>
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Prioridad
                </Heading>
                <span className={`priority-dot ${getPriorityStyle(requerimiento.prioridad)}`}>
                  {requerimiento.prioridad}
                </span>
              </GridItem>
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Tipo
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'md' }}>
                  {requerimiento.tipo}
                </Text>
              </GridItem>
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Categoría
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'md' }}>
                  {requerimiento.categoria}
                </Text>
              </GridItem>
            </Grid>

            {/* Segundo grupo de datos */}
            <Grid 
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} 
              gap={4} 
              width="full"
            >
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Emisor
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'md' }}>
                  {requerimiento.emisor}
                </Text>
              </GridItem>
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Propietario
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'md' }}>
                  {requerimiento.propietario}
                </Text>
              </GridItem>
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Fecha de Alta
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'md' }}>
                  {requerimiento.fechaCreacion}
                </Text>
              </GridItem>
              <GridItem>
                <Heading size={{ base: 'md', md: 'sm' }} mb={2} color="blue.900">
                  Última Actualización
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'md' }}>
                  {requerimiento.fechaActualizacion}
                </Text>
              </GridItem>
            </Grid>

            {/* Asunto */}
            <Box width="full">
              <Heading size={{ base: 'lg', md: 'md' }} mb={3} color="blue.900">
                Asunto
              </Heading>
              <Text 
                bg="gray.100" 
                p={3} 
                borderRadius="md" 
                width="full"
                fontSize={{ base: 'lg', md: 'md' }}
              >
                {requerimiento.asunto}
              </Text>
            </Box>

            {/* Descripción */}
            <Box width="full">
              <Heading size={{ base: 'lg', md: 'md' }} mb={3} color="blue.900">
                Descripción
              </Heading>
              <Text 
                bg="gray.100" 
                p={3} 
                borderRadius="md" 
                width="full" 
                minHeight="150px"
                fontSize={{ base: 'lg', md: 'md' }}
              >
                {requerimiento.descripcion}
              </Text>
            </Box>
          </VStack>
        </GridItem>

        <GridItem>
          <Box width="full">
            <Heading size={{ base: 'lg', md: 'md' }} mb={4} color="blue.900">
              Comentarios
            </Heading>
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
                    <Text color="gray.500" fontSize={{ base: 'md', md: 'sm' }}>
                      12 de Julio, 2023 - 14:30
                    </Text>
                  </HStack>
                </Flex>
                <Box>
                  <Heading size="xs" mb={2} color="gray.700">
                    Seguimiento de Requerimiento
                  </Heading>
                  <Text color="gray.900" fontSize={{ base: 'lg', md: 'md' }}>
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
                    <Text color="gray.500" fontSize={{ base: 'md', md: 'sm' }}>
                      13 de Julio, 2023 - 09:15
                    </Text>
                  </HStack>
                </Flex>
                <Box>
                  <Heading size="xs" mb={2} color="gray.700">
                    Respuesta al Seguimiento
                  </Heading>
                  <Text color="gray.900" fontSize={{ base: 'lg', md: 'md' }}>
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
