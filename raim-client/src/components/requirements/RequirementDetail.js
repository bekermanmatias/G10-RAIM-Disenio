// src/components/listRequirements/filters/RequirementDetail.js
import React, { useDebugValue, useEffect, useState } from 'react';
import { 
  Box,
  Button,
  VStack, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Text, 
  Input,
  Heading, 
  Flex, 
  Container, 
  Grid, 
  GridItem,
  Alert,
  AlertIcon,
  Spinner,
  HStack,
  useDisclosure
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
  const [ formData, setFormData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isCommentOpen, setCommentModal ] = useState(false);
  const [ isFileModalOpen, setFileModalOpen ] = useState(false);
  const [asunto, setAsunto] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments ] = useState(null);
  const handleBack = () => {
    navigate('/requirements');
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://g10-raim-disenio.onrender.com/api/comment/${codigo}`);
        if (!response.ok) {
          throw new Error("Error al obtener los comentarios");
        }
        const data = await response.json();
  
        if (response.status === 203) {
          console.log("No hay comentarios disponibles");
          return;
        }
        

  
        const commentsData = data.map((com) => ({
          asunto: com.asunto,
          descripcion: com.descripcion,
          emisor: com.idUsuarioEmisor,
          fechahora: com.fechahora,
        }));
  
        commentsData.sort((a, b) => new Date(b.fechahora) - new Date(a.fechahora));
        setComments(commentsData);
      } catch (error) {
        setError(error.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
  
    if (codigo) {
      fetchComments();
    }
  }, [codigo]);
  
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  

const handleOpenCommentModal = () => setCommentModal(true);
const handleCloseCommentModal = () => { 
  setCommentModal(false);
  setAsunto('');
  setDescripcion('');
}
const handleOpenFileModal =  () => setFileModalOpen(true);
const handleCloseFileModal = () => {
  setFileModalOpen(false);
  setSelectedFile(null);
}

const handleConfirmComment = async () => {
  const nombreUsuario = String(localStorage.getItem('usuario'));
  const DataToSend = {
      asunto: asunto,
      descripcion: descripcion,
      emisor: nombreUsuario,
      codReq: codigo,
  }

  try {
      const response = await fetch('https://g10-raim-disenio.onrender.com/api/comment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(DataToSend),
      });

      if(response.ok){
          console.log('Comment submitted successfully!');
          // Cerrar el modal
          handleCloseCommentModal();
          
          // Recargar los comentarios
          const newCommentsResponse = await fetch(`https://g10-raim-disenio.onrender.com/api/comment/${codigo}`);
          const newCommentsData = await newCommentsResponse.json();
          
          if (Array.isArray(newCommentsData)) {
              const updatedComments = newCommentsData.map((com) => ({
                  asunto: com.asunto,
                  descripcion: com.descripcion,
                  emisor: com.idUsuarioEmisor,
                  fechahora: com.fechahora,
              }));
              
              updatedComments.sort((a, b) => new Date(b.fechahora) - new Date(a.fechahora));
              setComments(updatedComments);
          }

          // Limpiar los campos
          setAsunto('');
          setDescripcion('');
      } else {
          console.error('No pudo subirse el comentario.');
      }
  } catch (error) {
      console.error('Error: ', error.message);
  }
};


    const handleCancelComment = () => {
      setAsunto('');
      setDescripcion('');
      handleCloseCommentModal();
    };

  const handleFileChange = (e) => {
    const file = e.target.files
    setSelectedFile(file)
  }

  const handleConfirmArchivos = async () => {
    if (!selectedFile) {
      console.error('No hay archivos seleccionados.');
      return;
    }
    const file = selectedFile[0];
    console.log(file);
    
    const formData = new FormData();

    formData.append('file', file);
    formData.append('idReq', codigo);
  
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await fetch('https://g10-raim-disenio.onrender.com/api/uploadFiles', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('El archivo se subió exitosamente.');
        setSelectedFile(null); 
        handleCloseFileModal(); 
      } else {
        console.error('Error subiendo los archivos', error.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
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
        <Heading size={{ base: "lg", md: "md" }} mb={4} color="blue.900">
          Comentarios
        </Heading>

        {loading && <Spinner />}
        {error && <Text color="red.500">{error}</Text>}

        <VStack spacing={4} width="full" align="stretch">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment, index) => (
              <Box
                key={index}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                bg="white"
              >
                <Flex justifyContent="space-between" mb={2}>
                  <HStack>
                    <Text fontWeight="bold" color="blue.900">
                      {comment.emisor}
                    </Text>
                    <Text color="gray.500" fontSize={{ base: "md", md: "sm" }}>
                      {new Date(comment.fechahora).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(comment.fechahora).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </HStack>
                </Flex>
                <Box>
                  <Heading size="xs" mb={2} color="gray.700">
                    {comment.asunto}
                  </Heading>
                  <Text color="gray.900" fontSize={{ base: "lg", md: "md" }}>
                    {comment.descripcion}
                  </Text>
                </Box>
              </Box>
            ))
          ) : (
            <Text color="gray.500">No hay comentarios disponibles.</Text>
          )}
              <CustomButton colorScheme="blue" onClick={handleOpenCommentModal} mt={4}>Agregar Comentario</CustomButton>
            </VStack>

            <Modal isOpen={isCommentOpen} onClose={handleCloseCommentModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Escribir Comentario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Input
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  placeholder="Asunto"
                  size="lg"
                  mb={4}
                />
                <Textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción"
                size="lg"
                minHeight="150px"
                />
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" onClick={handleCloseCommentModal}>Cancelar</Button>
                  <Button colorScheme="blue" onClick={handleConfirmComment} ml={3}>Confirmar</Button>
                </ModalFooter>
              </ModalContent>
      </Modal>
          </Box>
        </GridItem>
      </Grid>

      <Flex justifyContent="flex-end" mt={6} wrap="wrap" gap={4}>
       <CustomButton 
            onClick={handleBack} 
            variant="apply" 
            width={{ base: '100%', md: '20%' }}
          >
            ← Volver
          </CustomButton>

          <CustomButton 
          onClick={handleOpenFileModal} 
          variant="archivoAdjunto" 
          width={{ base: '100%', md: '20%' }}
        >
          Agregar Archivo Adjunto
        </CustomButton>
        </Flex>
        <Modal isOpen={isFileModalOpen} onClose={handleCloseFileModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Archivo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Seleccione el archivo que desea adjuntar.</Text>
            <Input
              type="file"
              name="archivos"
              multiple
              onChange={handleFileChange}
              variant="outline"
              borderColor="gray.300"
              focusBorderColor="blue.900"
              _hover={{ borderColor: 'blue.900' }}
              borderRadius="md"
              size="md"
              backgroundColor="white"
              color="gray.800"
              fontWeight="medium"
              boxShadow="sm"
              accept=".pdf,.docx,.excel"
              placeholder="Seleccione archivos"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleCloseFileModal}>Cancelar</Button>
            <Button colorScheme="blue" ml={3} onClick={handleConfirmArchivos}>Confirmar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RequirementDetail;
