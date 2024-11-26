import React, { useState, useCallback } from 'react';
import { 
    Box, 
    VStack, 
    HStack, 
    FormControl, 
    FormLabel, 
    Input, 
    Select, 
    Textarea, 
    Button, 
    Heading, 
    Radio, 
    RadioGroup,
    Flex,
    useToast,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Alert,
    AlertDescription,
    useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateContainer from './CreateContainer';
import { ChevronDownIcon } from '@chakra-ui/icons';

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

// Componente para la columna izquierda del formulario
const LeftFormColumn = ({ 
    tipos, 
    categorias, 
    formData, 
    handleChange, 
    handleFileChange 
}) => (
    <VStack width="50%" spacing={4}>
        <FormControl>
            <FormLabel>Tipo *</FormLabel>
            <Select 
                name="descTipoReq" 
                value={formData.descTipoReq} 
                onChange={handleChange}
                placeholder="Seleccione el Tipo"
                variant="outline"
                borderColor="gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.600'
                }}
                icon={<Icon as={ChevronDownIcon} />}
                iconColor="gray.600"
                size="md"
                borderRadius="md"
                backgroundColor="white"
                color="gray.800"
                fontWeight="medium"
                boxShadow="sm"
            >
                {tipos.map(tipo => (
                    <option 
                        key={tipo} 
                        value={tipo}
                        style={{ 
                            backgroundColor: 'white',
                            color: 'black' 
                        }}
                    >
                        {tipo}
                    </option>
                ))}
            </Select>
        </FormControl>
        
        <FormControl width="full" mt={-0.5}>
            <FormLabel>Categoria *</FormLabel>
            <Select 
                name="nombreCategoria" 
                value={formData.nombreCategoria} 
                onChange={handleChange}
                placeholder="Seleccione la Categoría"
                variant="outline"
                borderColor="gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.600'
                }}
                icon={<Icon as={ChevronDownIcon} />}
                iconColor="gray.600"
                size="md"
                borderRadius="md"
                backgroundColor="white"
                color="gray.800"
                fontWeight="medium"
                boxShadow="sm"
            >
                {categorias.map(categoria => (
                    <option 
                        key={categoria} 
                        value={categoria}
                        style={{ 
                            backgroundColor: 'white',
                            color: 'black' 
                        }}
                    >
                        {categoria}
                    </option>
                ))}
            </Select>
        </FormControl>

        <FormControl>
 <FormLabel>Asunto *</FormLabel>
            <Input
                type="text"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                maxLength="50"
                variant="outline"
                borderColor="gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.600'
                }}
                size="md"
                borderRadius="md"
                backgroundColor="white"
                color="gray.800"
                fontWeight="medium"
                boxShadow="sm"
                placeholder="Ingrese el asunto"
                _placeholder={{ 
                    color: 'gray.500' 
                }}
            />
        </FormControl>

        <FormControl>
            <FormLabel>Descripción *</FormLabel>
            <Textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                maxLength="5000"
                variant="outline"
                borderColor="gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.600'
                }}
                size="md"
                borderRadius="md"
                backgroundColor="white"
                color="gray.800"
                fontWeight="medium"
                boxShadow="sm"
                placeholder="Ingrese una descripción detallada"
                _placeholder={{ 
                    color: 'gray.500' 
                }}
                resize="vertical"
                minHeight="120px"
                rows={4}
            />
        </FormControl>

        <FormControl>
            <FormLabel>Archivos Adjuntos</FormLabel>
            <Input 
                type="file" 
                name="archivos" 
                multiple 
                onChange={handleFileChange}
                variant="outline"
                borderColor="gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.600'
                }}
                borderRadius="md"
                size="md"
                backgroundColor="white"
                color="gray.800"
                fontWeight="medium"
                boxShadow="sm"
                p={1}
                sx={{
                    '::file-selector-button': {
                        height: '100%',
                        mr: 4,
                        border: 'none',
                        background: 'gray.100',
                        color: 'gray.700',
                        fontWeight: 'medium',
                        px: 4,
                        borderRadius: 'md',
                        _hover: {
                            background: 'gray.200'
                        }
                    }
                }}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                placeholder="Seleccione archivos"
            />
        </FormControl>
    </VStack>
);

// Componente para la columna derecha del formulario
const RightFormColumn = ({ 
    users, 
    formData, 
    handleChange 
}) => (
    <VStack width="50%" spacing={4}>
        <FormControl>
            <FormLabel>Prioridad *</FormLabel>
            <RadioGroup 
                name="descPrioridad" 
                onChange={(value) => handleChange({ 
                    target: { 
                        name: 'descPrioridad', 
                        value 
                    } 
                })} 
                value={formData.descPrioridad}
            >
                <HStack spacing={4}>
                    {['Urgente', 'Alta', 'Media', 'Baja'].map((priority) => {
                        const priorityStyle = getPriorityStyle(priority);
                        return (
                            <Radio 
                                key={priority} 
                                value={priority}
                                sx={{
                                    '.chakra-radio__control': {
                                        display: 'none' // Oculta el radio original
                                    }
                                }}
                            >
                                <Flex 
                                    align="center" 
                                    bg={priorityStyle.bgColor}
                                    color={priorityStyle.textColor}
                                    px={2}
                                    py={1}
                                    borderRadius="12px"
                                    fontSize="0.9rem"
                                    fontWeight={500}
                                >
                                    <Box 
                                        mr={2}
                                        width="8px"
                                        height="8px"
                                        borderRadius="50%"
                                        bg={priorityStyle.dotColor}
                                    />
                                    {priority}
                                </Flex>
                            </Radio>
                        );
                    })}
                </HStack>
            </RadioGroup>
        </FormControl>

        <FormControl mt={2}>
            <FormLabel>Destinatario</FormLabel>
            <Select 
                name="destinatario" 
                value={formData.destinatario} 
                onChange={handleChange}
                placeholder="Seleccione el Destinatario"
                variant="outline"
                borderColor="gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.600'
                }}
                icon={<Icon as={ChevronDownIcon} />}  // Cambiado aquí
                iconColor="gray.600"
                size="md"
                borderRadius="md"
                backgroundColor="white"
                color="gray.800"
                fontWeight="medium"
                boxShadow="sm"
            >
                {users.map(user => (
                    <option 
                        key={user.value} 
                        value={user.value}
                        style={{ 
                            backgroundColor: 'white',
                            color: 'black' 
                        }}
                    >
                        {user.label}
                    </option>
                ))}
            </Select>
        </FormControl>

        <FormControl>
            <FormLabel>Requerimientos Relacionados</FormLabel>
            <Textarea
                name="relacionados"
                value={formData.relacionados}
                onChange={handleChange}
                maxLength="500"
            />
        </FormControl>
    </VStack>
);

// Hook personalizado para manejar el formulario
const useRequirementForm = (initialState, createRequirement, navigate, toast) => {
    const [formData, setFormData] = useState(initialState);
    const [users, setUsers] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);
    
    const handleFileChange = useCallback((e) => {
        setFormData(prevState => ({
            ...prevState,
            archivos: e.target.files
        }));
    }, []);

    const validateForm = useCallback(() => {
        const requiredFields = ['descTipoReq', 'nombreCategoria', 'descPrioridad', 'asunto', 'descripcion'];
        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

        if (missingFields.length > 0) {
            const missingFieldsString = missingFields.join(', ');
            toast({
                title: "Error de Validación",
                description: `Faltan los siguientes campos: ${missingFieldsString}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return false;
        }
        return true;
    }, [formData, toast]);

    const handleSubmit = useCallback(async (e) => {
        e?.preventDefault(); // Añade optional chaining
        
        if (!validateForm()) {
            return; // Si la validación falla, no continuar
        }
        
        try {
            await createRequirement(formData);
            toast({
                title: "Requerimiento Creado",
                description: "El requerimiento se ha creado exitosamente",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            navigate('/requirements');
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }, [validateForm, createRequirement, navigate, toast, formData]);
    return {
        formData,
        users,
        tipos,
        categorias,
        setUsers,
        setTipos,
        setCategorias,
        handleChange,
        handleFileChange,
        handleSubmit,
        validateForm // Asegúrate de que validateForm esté incluido
    };
};

// Servicio para crear requerimiento (puedes moverlo a un archivo separado)
const createRequirementService = async (formData) => {
    const dataToSend = {
        asunto: formData.asunto,
        descripcion: formData.descripcion,
        descEstado: formData.descEstado,
        descPrioridad: formData.descPrioridad,
        descTipoReq: formData.descTipoReq,
        dueno: formData.dueno,
        nombreCategoria: formData.nombreCategoria, 
        ...(formData.destinatario && { destinatario: formData.destinatario }),
        ...(formData.relacionados && { relacionados: formData.relacionados })
    };

    const response = await fetch('https://g10-raim-disenio.onrender.com/api/requirement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo crear el requerimiento');
    }

    return await response.json();
};

// Componente principal
const CrearRequerimiento = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const initialState = {
        descTipoReq: '',
        descPrioridad: '',
        asunto: '',
        descripcion: '',
        dueno: 'jperez',
        descEstado: '', 
        nombreCategoria: '',
        destinatario: '',
        relacionados: '',
        archivos: null,
    };

    const {
        formData,
        users,
        tipos,
        categorias,
        setUsers,
        setTipos,
        setCategorias,
        handleChange,
        handleFileChange,
        handleSubmit,
        validateForm
    } = useRequirementForm(initialState, createRequirementService, navigate, toast);
    
    // Modales para confirmar acciones
    const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: onCloseCancel } = useDisclosure();
    const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();
    const [missingFields, setMissingFields] = useState([]);
    const [showMissingFieldsAlert, setShowMissingFieldsAlert] = useState(false);

    const handleCancel = () => {
        onOpenCancel(); // Abre el modal de confirmación de cancelación
    };

    const handleConfirmCancel = () => {
        onCloseCancel(); // Cierra el modal
        navigate('/requirements'); // Navega a la ruta deseada
    };

    const handleConfirmSave = async (e) => {
        e?.preventDefault(); // Añade un optional chaining para manejar casos donde el evento podría ser undefined
        onCloseSave(); // Cierra el modal
        await handleSubmit(new Event('submit')); // Pasa un nuevo evento de submit
    };

// Mapeo de nombres de campos para mostrar etiquetas legibles
const fieldLabels = {
    descTipoReq: 'Tipo',
    nombreCategoria: 'Categoría',
    descPrioridad: 'Prioridad',
    asunto: 'Asunto',
    descripcion: 'Descripción'
};

const handleSubmitWithConfirmation = async (e) => {
    e.preventDefault();
    
    // Validar el formulario y obtener los campos faltantes
    const requiredFields = ['descTipoReq', 'nombreCategoria', 'descPrioridad', 'asunto', 'descripcion'];
    const missing = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

    if (missing.length > 0) {
        // Mapea los nombres de campos a sus etiquetas legibles
        const missingFieldLabels = missing.map(field => fieldLabels[field] || field);
        setMissingFields(missingFieldLabels); // Establece los campos faltantes con etiquetas
        setShowMissingFieldsAlert(true); // Muestra la alerta
    } else {
        // Si no hay campos faltantes, abre el modal de confirmación de guardado
        onOpenSave();
    }
};
    return (
        <Box p={6}>
            <CreateContainer 
                setUsers={setUsers} 
                setTipos={setTipos} 
                setCategorias={setCategorias} 
            />
            <Heading mb={6} color="blue.900"> Agregar Nuevo Requerimiento</Heading>
            
            {showMissingFieldsAlert && (
                <Alert status="error" mb={4}>
                    <AlertDescription>
                        Complete los siguientes campos: {missingFields.join(', ')}
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmitWithConfirmation}>
                <Flex gap={6}>
                    <LeftFormColumn 
                        tipos={tipos} 
                        categorias={categorias} 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleFileChange={handleFileChange} 
                    />
                    <RightFormColumn 
                        users={users} 
                        formData={formData} 
                        handleChange={handleChange} 
                    />
                </Flex>

                <HStack spacing={4} mt={6}>
                    <Flex 
                        justifyContent="flex-end" 
                        alignItems="center" 
                        mt={6} 
                        width="full"
                        gap={4}
                    >
                        <Button 
                            colorScheme="red"
                            variant="solid"
                            bg="red.600"
                            _hover={{
                                bg: "red.500"
                            }}
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            colorScheme="blue"
                            variant="solid"
                            bg="blue.900"
                            _hover={{
                                bg: "blue.800"
                            }}
                            type="submit"
                        >
                            Guardar Requerimiento
                        </Button>
                    </Flex>
                </HStack>
            </form>

            {/* Modal de confirmación de cancelación */}
            <Modal isOpen={isOpenCancel} onClose={onCloseCancel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar Cancelación</ModalHeader>
                    <ModalBody>
                        ¿Está seguro de que desea cancelar? Perderá todos los cambios.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" onClick={onCloseCancel}>
                            Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={handleConfirmCancel} ml={3}>
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal de confirmación de guardado */}
            <Modal isOpen={isOpenSave} onClose={onCloseSave}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar Guardado</ModalHeader>
                    <ModalBody>
                        <p>¿Está seguro de que desea guardar el nuevo requerimiento?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" onClick={onCloseSave}>
                            Cancelar
                        </Button>
                        <Button colorScheme="blue" onClick={handleConfirmSave} ml={3}>
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CrearRequerimiento;