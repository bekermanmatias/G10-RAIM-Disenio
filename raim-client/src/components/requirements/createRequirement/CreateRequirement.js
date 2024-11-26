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
    Icon 
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
        <FormControl isRequired>
        <FormLabel>Tipo</FormLabel>
        <Select 
            name="descTipoReq" 
            value={formData.descTipoReq} 
            onChange={handleChange}
            placeholder="Seleccione el Tipo"
            variant="outline"  // Cambiar a outline para mayor visibilidad
            borderColor="gray.300"  // Borde más visible
            focusBorderColor="blue.900"  // Color del borde al focus
            _hover={{
                borderColor: 'blue.600'  // Cambio de color del borde al pasar el mouse
            }}
            icon={<Icon as={ChevronDownIcon} />}  // Ícono personalizado de dropdown
            iconColor="gray.600"
            size="md"  // Tamaño del select
            borderRadius="md"  // Bordes redondeados
            backgroundColor="white"  // Fondo blanco
            color="gray.800"  // Color de texto oscuro
            fontWeight="medium"  // Peso de fuente
            boxShadow="sm"  // Sombra sutil para profundidad
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
        
        <FormControl width="full" mt={-0.5} isRequired>
    <FormLabel>Categoría</FormLabel>
    <Select 
        name="nombreCategoria" 
        value={formData.nombreCategoria} 
        onChange={handleChange}
        placeholder="Seleccione la Categoría"
        variant="outline"  // Cambiar a outline para mayor visibilidad
        borderColor="gray.300"  // Borde más visible
        focusBorderColor="blue.900"  // Color del borde al focus
        _hover={{
            borderColor: 'blue.600'  // Cambio de color del borde al pasar el mouse
        }}
        icon={<Icon as={ChevronDownIcon} />}  // Ícono personalizado de dropdown
        iconColor="gray.600"
        size="md"  // Tamaño del select
        borderRadius="md"  // Bordes redondeados
        backgroundColor="white"  // Fondo blanco
        color="gray.800"  // Color de texto oscuro
        fontWeight="medium"  // Peso de fuente
        boxShadow="sm"  // Sombra sutil para profundidad
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

<FormControl isRequired>
    <FormLabel>Asunto</FormLabel>
    <Input
        type="text"
        name="asunto"
        value={formData.asunto}
        onChange={handleChange}
        maxLength="50"
        variant="outline"  // Estilo de borde visible
        borderColor="gray.300"  // Color de borde
        focusBorderColor="blue.900"  // Color de borde al focus
        _hover={{
            borderColor: 'blue.600'  // Cambio de color al pasar el mouse
        }}
        size="md"  // Tamaño medio
        borderRadius="md"  // Bordes redondeados
        backgroundColor="white"  // Fondo blanco
        color="gray.800"  // Color de texto
        fontWeight="medium"  // Peso de fuente
        boxShadow="sm"  // Sombra sutil
        placeholder="Ingrese el asunto"  // Placeholder descriptivo
        _placeholder={{ 
            color: 'gray.500'  // Color del placeholder
        }}
    />
</FormControl>

<FormControl isRequired>
    <FormLabel>Descripción</FormLabel>
    <Textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        maxLength="5000"
        variant="outline"  // Estilo de borde visible
        borderColor="gray.300"  // Color de borde
        focusBorderColor="blue.900"  // Color de borde al focus
        _hover={{
            borderColor: 'blue.600'  // Cambio de color al pasar el mouse
        }}
        size="md"  // Tamaño medio
        borderRadius="md"  // Bordes redondeados
        backgroundColor="white"  // Fondo blanco
        color="gray.800"  // Color de texto
        fontWeight="medium"  // Peso de fuente
        boxShadow="sm"  // Sombra sutil
        placeholder="Ingrese una descripción detallada"  // Placeholder descriptivo
        _placeholder={{ 
            color: 'gray.500'  // Color del placeholder
        }}
        resize="vertical"  // Permite redimensionar verticalmente
        minHeight="120px"  // Altura mínima
        rows={4}  // Número de filas inicial
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
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif" // Tipos de archivo permitidos
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
<FormControl isRequired>
    <FormLabel>Prioridad</FormLabel>
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
        variant="outline"  // Cambiar a outline para mayor visibilidad
        borderColor="gray.300"  // Borde más visible
        focusBorderColor="blue.900"  // Color del borde al focus
        _hover={{
            borderColor: 'blue.600'  // Cambio de color del borde al pasar el mouse
        }}
        icon={<Icon as={ChevronDownIcon} />}  // Ícono personalizado de dropdown
        iconColor="gray.600"
        size="md"  // Tamaño del select
        borderRadius="md"  // Bordes redondeados
        backgroundColor="white"  // Fondo blanco
        color="gray.800"  // Color de texto oscuro
        fontWeight="medium"  // Peso de fuente
        boxShadow="sm"  // Sombra sutil para profundidad
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
        const requiredFields = ['descTipoReq', 'descPrioridad', 'asunto', 'descripcion'];
        
        for (let field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                toast({
                    title: "Error de Validación",
                    description: `El campo ${field} es requerido`,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
                return false;
            }
        }
        return true;
    }, [formData, toast]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
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
        handleSubmit
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
        handleSubmit
    } = useRequirementForm(initialState, createRequirementService, navigate, toast);

    const handleCancel = () => {
        navigate('/requirements');
    };

    return (
        <Box p={6}>
            <CreateContainer 
                setUsers={setUsers} 
                setTipos={setTipos} 
                setCategorias={setCategorias} 
            />
            <Heading mb={6} color="blue.900">Agregar Nuevo Requerimiento</Heading>
            
            <form onSubmit={handleSubmit}>
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
        </Box>
    );
};

export default CrearRequerimiento;