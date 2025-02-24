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

    const filteredRequirements = requerimientos.filter(req =>
        req.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.label.toLowerCase().includes(searchTerm.toLowerCase())  
    );

    useEffect(() => {
        if (isOpen) {
            setDisplayedItems(filteredRequirements.slice(0, itemsPerPage)); 
            setSelectedRequirements(initialSelectedRequirements || []); 
        }
    }, [isOpen, initialSelectedRequirements, requerimientos]); 

    const loadMoreItems = () => {
        const newItems = filteredRequirements.slice(displayedItems.length, displayedItems.length + itemsPerPage);
        setDisplayedItems(prevItems => [...prevItems, ...newItems]);
    };

    if (error) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w={{ base: "90%", md: "600px" }}>
                    <ModalHeader>Error</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Text color="red.500">{error}</Text>
                            <CustomButton variant="cancel" onClick={onClose} width="100%">
                                Cerrar
                            </CustomButton>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

    if (children) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w={{ base: "90%", md: "600px" }}>
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
                w={{ base: "90%", md: "800px" }}
                maxW={{ base: "90%", md: "1200px" }}
            >
                <ModalHeader>Relacionar Requerimientos</ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="Buscar requerimientos..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setDisplayedItems(filteredRequirements.slice(0, itemsPerPage)); // Reiniciar elementos al buscar
                        }}
                        mb={4}
                    />
                    <Table variant="simple" size="md" width="full">
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
                <ModalFooter flexDirection={{ base: "column", md: "row" }} alignItems="center">
                    <CustomButton 
                        variant="cancel" 
                        onClick={onClose} 
                        mr={{ base: 0, md: 2 }}
                        width={{ base: "100%", md: "auto" }}
                        mb={{ base: 2, md: 0 }}
                    >
                        Cancelar
                    </CustomButton>
                    <CustomButton 
                        variant="apply" 
                        onClick={handleSave} 
                        width={{ base: "100%", md: "auto" }}
                    >
                        Guardar
                    </CustomButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RelateRequirementsModal;
