// src/components/requirements/createRequirement/createRequirement.js
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
    Tag,
    TagCloseButton,
    TagLabel
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateContainer from './CreateContainer';
import { ChevronDownIcon } from '@chakra-ui/icons';
import CustomButton from '../../../utils/CustomButton';
import RelateRequirementsModalContainer from './RelateRequirementsModalContainer'; // Corrige la ruta de importación

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
                    borderColor: 'blue.900'
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
                name="descCategoriaTR" 
                value={formData.descCategoriaTR} 
                onChange={handleChange}
                placeholder="Seleccione la Categoría"
                variant="outline"
                borderColor="gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.900'
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
                    borderColor: 'blue.900'
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
                    borderColor: 'blue.900'
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
    </VStack>
);

const RightFormColumn = ({ 
    users, 
    formData, 
    handleChange,
    onOpenRelateRequirements,
    relatedRequirements,
    handleRemoveRequirement,
    handleFileChange
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
                <HStack spacing={4} >
                    {['Urgente', 'Alta', 'Media', 'Baja'].map((priority) => {
                        const priorityStyle = getPriorityStyle(priority);
                        return (
                            <Radio 
                                key={priority} 
                                value={priority}
                                sx={{
                                    '.chakra-radio__control': {
                                        display: 'none' // Oculta el radio original
                                    },
                                    
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
                borderColor=" gray.300"
                focusBorderColor="blue.900"
                _hover={{
                    borderColor: 'blue.900'
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
                    borderColor: 'blue.900'
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
                accept=".pdf,.docx,.excel"
                placeholder="Seleccione archivos"
            />
        </FormControl>


        <FormControl>
            <FormLabel>Requerimientos Relacionados</FormLabel>
            <Flex>
                <CustomButton 
                    onClick={onOpenRelateRequirements} 
                    variant="outline" 
                    width="full"
                >
                    Seleccionar
                </CustomButton>
            </Flex>
            {relatedRequirements.length > 0 && (
                <Box mt={2} p={2} border="1px" borderColor="gray.200" borderRadius="md">
                    <Flex wrap="wrap">
                        {relatedRequirements.map(req => (
                            <Tag key={req.value} m={1} colorScheme="gray">
                                <TagLabel>{req.value} - {req.label}</TagLabel>
                                <TagCloseButton onClick={() => handleRemoveRequirement(req.value)} />
                            </Tag>
                        ))}
                    </Flex>
                </Box>
            )}
        </FormControl>
    </VStack>
);

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
        const requiredFields = ['descTipoReq', 'descCategoriaTR', 'descPrioridad', 'asunto', 'descripcion'];
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
        e?.preventDefault();
        
        if (!validateForm()) {
            return;
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
        validateForm 
    };
};

const createRequirementService = async (formData) => {
    const dataToSend = {
        asunto: formData.asunto,
        descripcion: formData.descripcion,
        descPrioridad: formData.descPrioridad,
        descTipoReq: formData.descTipoReq,
        dueno: 'jperez',
        descCategoriaTR: formData.descCategoriaTR, 
        destinatario: formData.destinatario, 
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
        throw new Error(errorData.message || 'No se pudo crear el requerimiento, intente más tarde!');
    }

    return await response.json();
};

const CrearRequerimiento = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const initialState = {
        descTipoReq: '',
        descPrioridad: '',
        asunto: '',
        descripcion: '',
        dueno: String(localStorage.getItem('usuario')),
        descEstado: '', 
        descCategoriaTR: '',
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
    
    const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: onCloseCancel } = useDisclosure();
    const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();
    const [missingFields, setMissingFields] = useState([]);
    const [showMissingFieldsAlert, setShowMissingFieldsAlert] = useState(false);
    const [relatedRequirements, setRelatedRequirements] = useState([]);
    const { isOpen: isOpenRelateRequirements, onOpen: onOpenRelateRequirements, onClose: onCloseRelateRequirements } = useDisclosure();

    const handleRemoveRequirement = (value) => {
        setRelatedRequirements(prevRequirements =>
            prevRequirements.filter(req => req.value !== value)
        );
    };
    
    const handleCancel = () => {
        onOpenCancel();
    };

    const handleConfirmCancel = () => {
        onCloseCancel();
        navigate('/requirements'); 
    };

    const handleConfirmSave = async (e) => {
        e?.preventDefault(); 
        onCloseSave();
        await handleSubmit(new Event('submit'));
    };

    const fieldLabels = {
        descTipoReq: 'Tipo',
        descCategoriaTR: 'Categoría',
        descPrioridad: 'Prioridad',
        asunto: 'Asunto',
        descripcion: 'Descripción'
    };

    const handleSubmitWithConfirmation = async (e) => {
        e.preventDefault();
        
        const requiredFields = ['descTipoReq', 'descCategoriaTR', 'descPrioridad', 'asunto', 'descripcion'];
        const missing = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

        if (missing.length > 0) {
            const missingFieldLabels = missing.map(field => fieldLabels[field] || field);
            setMissingFields(missingFieldLabels);
            setShowMissingFieldsAlert(true); 
        } else {
            onOpenSave();
        }
    };

    const handleSelectRelatedRequirements = (selected) => {
        setRelatedRequirements(selected);
        handleChange({
            target: {
                name: 'relacionados', 
                value: selected.map(req => req.value).join(', ')
            }
        });
        onCloseRelateRequirements();
    };

    return (
        <Box p={6}>
            <CreateContainer 
                setUsers={setUsers} 
                setTipos={setTipos} 
                setCategorias={setCategorias} 
            />
            <Heading mb ={6} color="blue.900"> Agregar Nuevo Requerimiento</Heading>
            
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
                        onOpenRelateRequirements={onOpenRelateRequirements}
                        relatedRequirements={relatedRequirements}
                        handleRemoveRequirement={handleRemoveRequirement}
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
                        <CustomButton 
                            variant="cancel" 
                            onClick={handleCancel}
                        >
                            Cancelar
                        </CustomButton>
                        <CustomButton 
                            variant="apply" 
                            type="submit"
                        >
                            Guardar Requerimiento
                        </CustomButton>
                    </Flex>
                </HStack>
            </form>

            {/* Modal de Relacionar Requerimientos */}
            <RelateRequirementsModalContainer
                isOpen={isOpenRelateRequirements}
                onClose={onCloseRelateRequirements}
                onSelect={handleSelectRelatedRequirements}
                selectedRequirements={relatedRequirements}
            />
            {/* Modal de confirmación de cancelación */}
            <Modal isOpen={isOpenCancel} onClose={onCloseCancel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar Cancelación</ModalHeader>
                    <ModalBody>
                        ¿Está seguro de que desea cancelar? Perderá todos los cambios.
                    </ModalBody>
                    <ModalFooter>
                        <CustomButton 
                            variant="cancel" 
                            onClick={onCloseCancel}
                            mr={3}
                        >
                            Cancelar
                        </CustomButton>
                        <CustomButton 
                            variant="delete" 
                            onClick={handleConfirmCancel}
                        >
                            Descartar cambios
                        
                        </CustomButton>
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
                        <CustomButton 
                            variant="cancel" 
                            onClick={onCloseSave}
                            mr={3}
                        >
                            Cancelar
                        </CustomButton>
                        <CustomButton 
                            variant="confirm" 
                            onClick={handleConfirmSave}
                        >
                            Confirmar
                        </CustomButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CrearRequerimiento;