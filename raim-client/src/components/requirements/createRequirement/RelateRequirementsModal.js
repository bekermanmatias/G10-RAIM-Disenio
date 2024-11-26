// RelateRequirementsModal.js
import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    Text,
    VStack,
    Flex,
} from '@chakra-ui/react';
import CustomButton from '../../../utils/CustomButton'; // Asegúrate de que la ruta sea correcta

const RelateRequirementsModal = ({ 
    isOpen, 
    onClose, 
    requerimientos = [], // Valor por defecto
    onSelect, 
    selectedRequirements: initialSelectedRequirements,
    error,
    children 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequirements, setSelectedRequirements] = useState(initialSelectedRequirements || []);
    const [displayedItems, setDisplayedItems] = useState([]);
    const itemsPerPage = 10;

    const handleSelect = (req) => {
        if (selectedRequirements.some(item => item.value === req.value)) {
            setSelectedRequirements(selectedRequirements.filter(item => item.value !== req.value));
        } else {
            setSelectedRequirements([...selectedRequirements, req]);
        }
    };

    const handleSave = () => {
        onSelect(selectedRequirements);
        onClose();
    };

    // Filtrar requerimientos por código o asunto
    const filteredRequirements = requerimientos.filter(req =>
        req.value.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrar por código
        req.label.toLowerCase().includes(searchTerm.toLowerCase())  // Filtrar por asunto
    );

    useEffect(() => {
        if (isOpen) {
            setDisplayedItems(filteredRequirements.slice(0, itemsPerPage)); // Cargar los primeros 10 elementos
            setSelectedRequirements(initialSelectedRequirements || []); // Inicializar seleccionados
        }
    }, [isOpen, initialSelectedRequirements, requerimientos]); // Asegúrate de incluir requerimientos aquí

    const loadMoreItems = () => {
        const newItems = filteredRequirements.slice(displayedItems.length, displayedItems.length + itemsPerPage);
        setDisplayedItems(prevItems => [...prevItems, ...newItems]);
    };

    // Si hay un error, muestra un mensaje de error
    if (error) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Error</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Text color="red.500">{error}</Text>
                            <CustomButton variant="cancel" onClick={onClose}>Cerrar</CustomButton>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

    // Si hay contenido de children (como un spinner), renderízalo
    if (children) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Relacionar Requerimientos</ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent 
                width="90%"
                maxWidth="1200px"
                minWidth="800px"
            >
                <ModalHeader>Relacionar Requerimientos</ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="Buscar requerimientos..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setDisplayedItems(filteredRequirements.slice(0, itemsPerPage)); // Reiniciar los elementos mostrados al buscar
                        }}
                        mb={4}
                    />
                    <Table 
                        variant="simple" 
                        size="md"
                        width="full"
                    >
                        <Thead>
                            <Tr>
                                <Th>Seleccionar</Th>
                                <Th>Código</Th>
                                <Th>Asunto</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {displayedItems.map(req => (
                                <Tr key={req.value}>
                                    <Td>
                                        <Checkbox
                                            isChecked={selectedRequirements.some(item => item.value === req.value)}
                                            onChange={() => handleSelect(req)}
                                        />
                                    </Td>
                                    <Td>{req.value}</Td>
                                    <Td>{req.label}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <Flex justifyContent="center" mt={4}>
                        {displayedItems.length < filteredRequirements.length && (
                            <CustomButton variant="secondary" onClick={loadMoreItems}>
                                Ver más...
                            </CustomButton>
                        )}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <CustomButton variant="cancel" onClick={onClose} mr={2}>Cancelar</CustomButton>
                    <CustomButton variant="apply" onClick={handleSave}>Guardar</CustomButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RelateRequirementsModal;