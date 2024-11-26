import React, { useState, useEffect } from 'react';
import { 
    Spinner, 
    Center, 
    useToast 
} from '@chakra-ui/react';
import RelateRequirementsModal from './RelateRequirementsModal';

const RelateRequirementsModalContainer = ({ 
    isOpen, 
    onClose, 
    onSelect, 
    selectedRequirements 
}) => {
    const [requirements, setRequirements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    useEffect(() => {
        const fetchRequirements = async () => {
            // Solo realizar el fetch cuando el modal se abre
            if (isOpen) {
                setIsLoading(true);
                setError(null);

                try {
                    const response = await fetch('https://g10-raim-disenio.onrender.com/api/requirement', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (!response.ok) {
                        throw new Error('No se pudieron cargar los requerimientos');
                    }

                    const data = await response.json();
                    
                    // Transformar los datos al formato esperado por el modal
                    const formattedRequirements = data.map(req => ({
                        value: req.codigo, 
                        label: req.asunto,
                        fechaCreacion: new Date(req.fechaHora) 
                    }));

                    // Ordenar los requerimientos por fecha desde el más reciente
                    const sortedRequirements = formattedRequirements.sort((a, b) => b.fechaCreacion - a.fechaCreacion);

                    setRequirements(sortedRequirements);
                } catch (err) {
                    setError(err.message);
                    toast({
                        title: "Error al cargar requerimientos",
                        description: err.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchRequirements();
    }, [isOpen, toast]);

    // Si está cargando, muestra un spinner dentro del modal
    if (isLoading) {
        return (
            <RelateRequirementsModal
                isOpen={isOpen}
                onClose={onClose}
                requerimientos={[]}
                onSelect={onSelect}
                selectedRequirements={selectedRequirements}
            >
                <Center>
                    <Spinner size="xl" />
                </Center>
            </RelateRequirementsModal>
        );
    }

    // Si hay un error, muestra el modal con un mensaje de error
    if (error) {
        return (
            <RelateRequirementsModal
                isOpen={isOpen}
                onClose={onClose}
                requerimientos={[]}
                onSelect={onSelect}
                selectedRequirements={selectedRequirements}
                error={error}
            />
        );
    }

    // Renderiza el modal con los requerimientos cargados
    return (
        <RelateRequirementsModal
            isOpen={isOpen}
            onClose={onClose}
            requerimientos={requirements}
            onSelect={onSelect}
            selectedRequirements={selectedRequirements}
        />
    );
};

export default RelateRequirementsModalContainer;