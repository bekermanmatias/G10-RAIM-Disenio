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
    TagLabel,
    Stack,
    useBreakpointValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateContainer from './CreateContainer';
import { ChevronDownIcon } from '@chakra-ui/icons';
import CustomButton from '../../../utils/CustomButton';
import '../../listRequirements/components/TableRequirements.css';
import RelateRequirementsModalContainer from './RelateRequirementsModalContainer';

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

const LeftFormColumn = ({
    tipos,
    categorias,
    formData,
    handleChange,
    handleFileChange,
    isFullWidth
}) => (
    <VStack width={isFullWidth ? "100%" : "50%"} spacing={4}>
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
    handleFileChange,
    isFullWidth
}) => (
    <VStack width={isFullWidth ? "100%" : "50%"} spacing={4}>
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
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                    {['Urgente', 'Alta', 'Media', 'Baja'].map((priority) => (
                        <Radio
                            key={priority}
                            value={priority}
                            sx={{
                                '.chakra-radio__control': {
                                    display: 'none'
                                }
                            }}
                        >
                            <span className={`priority-dot ${getPriorityStyle(priority)}`}>
                                {priority}
                            </span>
                        </Radio>
                    ))}
                </Stack>
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
        dueno: localStorage.getItem('usuario'),
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
    const isMobile = useBreakpointValue({ base: true, md: false });

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
        <Box p={{ base: 4, md: 6 }}>
            <CreateContainer
                setUsers={setUsers}
                setTipos={setTipos}
                setCategorias={setCategorias}
            />
            <Heading mb={6} color="blue.900" fontSize={{ base: "xl", md: "2xl" }}>
                Nuevo Requerimiento
            </Heading>
           
            {showMissingFieldsAlert && (
                <Alert status="error" mb={4}>
                    <AlertDescription>
                        Complete los siguientes campos: {missingFields.join(', ')}
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmitWithConfirmation}>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 6, md: 6 }}
                    align="flex-start"
                >
                    <LeftFormColumn
                        tipos={tipos}
                        categorias={categorias}
                        formData={formData}
                        handleChange={handleChange}
                        handleFileChange={handleFileChange}
                        isFullWidth={isMobile}
                    />
                    <RightFormColumn
                        users={users}
                        formData={formData}
                        handleChange={handleChange}
                        onOpenRelateRequirements={onOpenRelateRequirements}
                        relatedRequirements={relatedRequirements}
                        handleRemoveRequirement={handleRemoveRequirement}
                        isFullWidth={isMobile}
                    />
                </Stack>

                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing={4}
                    mt={6}
                    width="full"
                    justify="flex-end"
                >
                    <CustomButton
                        variant="cancel"
                        onClick={handleCancel}
                        width={{ base: "full", sm: "auto" }}
                    >
                        Cancelar
                    </CustomButton>
                    <CustomButton
                        variant="apply"
                        type="submit"
                        width={{ base: "full", sm: "auto" }}
                    >
                        Guardar Requerimiento
                    </CustomButton>
                </Stack>
            </form>

            <RelateRequirementsModalContainer
                isOpen={isOpenRelateRequirements}
                onClose={onCloseRelateRequirements}
                onSelect={handleSelectRelatedRequirements}
                selectedRequirements={relatedRequirements}
            />
            
            <Modal isOpen={isOpenCancel} onClose={onCloseCancel}>
                <ModalOverlay />
                <ModalContent margin={{ base: 4, md: "auto" }}>
                    <ModalHeader>Confirmar Cancelación</ModalHeader>
                    <ModalBody>
                        ¿Está seguro de que desea cancelar? Perderá todos los cambios.
                    </ModalBody>
                    <ModalFooter>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            spacing={3}
                            width={{ base: "full", sm: "auto" }}
                        >
                            <CustomButton
                                variant="cancel"
                                onClick={onCloseCancel}
                                width={{ base: "full", sm: "auto" }}
                            >
                                Cancelar
                            </CustomButton>
                            <CustomButton
                                variant="delete"
                                onClick={handleConfirmCancel}
                                width={{ base: "full", sm: "auto" }}
                            >
                                Descartar cambios
                            </CustomButton>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenSave} onClose={onCloseSave}>
                <ModalOverlay />
                <ModalContent margin={{ base: 4, md: "auto" }}>
                    <ModalHeader>Confirmar Guardado</ModalHeader>
                    <ModalBody>
                        <p>¿Está seguro de que desea guardar el nuevo requerimiento?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            spacing={3}
                            width={{ base: "full", sm: "auto" }}
                        >
                            <CustomButton
                                variant="cancel"
                                onClick={onCloseSave}
                                width={{ base: "full", sm: "auto" }}
                            >
                                Cancelar
                            </CustomButton>
                            <CustomButton
                                variant="confirm"
                                onClick={handleConfirmSave}
                                width={{ base: "full", sm: "auto" }}
                            >
                                Confirmar
                            </CustomButton>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CrearRequerimiento;