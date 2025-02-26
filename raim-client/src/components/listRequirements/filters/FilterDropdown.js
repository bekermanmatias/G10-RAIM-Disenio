import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import CustomButton from '../../../utils/CustomButton';

const FilterDropdown = ({ onApply, onClose, initialFilters, tipos = [], categorias = [] }) => {
  const [filters, setFilters] = useState({
    estados: [],
    tipos: [],
    categorias: [],
    participacion: []
  });

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const filterOptions = {
    estados: ['Abierto', 'Asignado'],
    tipos: tipos,
    categorias: categorias,
    participacion: ['Emisor', 'Asignado']
  };

  const handleCheckboxChange = (group, values) => {
    setFilters(prev => ({
      ...prev,
      [group]: values
    }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const formatButtonLabel = (group) => {
    const selected = filters[group];
    if (selected.length === 0) return group.charAt(0).toUpperCase() + group.slice(1);

    if (selected.length <= 2) {
      return selected.join(', '); // Muestra todos si son pocos
    }

    return `${selected.slice(0, 2).join(', ')}... (${selected.length})`; // Si hay muchos, muestra los primeros y el total
  };

  const renderDropdown = (group, options) => (
    <Menu key={group} closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        width="100%"
        textAlign="left"
        variant="outline"
        border="1px solid #ccc"
        bg="white"
        maxWidth="800px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={3} 

        fontSize="1rem"  
      >
        <Text 
          noOfLines={1} 
          overflow="hidden" 
          whiteSpace="nowrap" 
          textOverflow="ellipsis"
          flex="1"
        >
          {formatButtonLabel(group)}
        </Text>
      </MenuButton>

      <MenuList minWidth="240px">
        <CheckboxGroup
          colorScheme="blue"
          value={filters[group]}
          onChange={(values) => handleCheckboxChange(group, values)}
        >
          <Stack spacing={3} px={4} py={2}> {/* Aumento del espaciado de los checkboxes */}
            {options.map(option => (
              <Checkbox key={option} value={option} fontSize="1rem"> {/* Aumento del tamaño de la fuente en checkboxes */}
                {option}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );

  return (
    <Box p={4}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        wrap="wrap"
      >
        {Object.entries(filterOptions).map(([group, options]) => (
          <Box key={group} flex="1" minWidth="180px">
            {renderDropdown(group, options)}
          </Box>
        ))}
      </Flex>
      <Flex 
        direction="row" 
        justify="flex-end" 
        mt={4} 
        gap={2} 
      >
        <CustomButton 
          variant="cancel" 
          onClick={onClose}
          width={{ base: "50%", md: "100px" }} // Cada botón ocupa el 50% en móvil
          fontSize="1rem"  
        >
          Cancelar
        </CustomButton>
        <CustomButton 
          variant="apply" 
          onClick={handleApply}
          width={{ base: "50%", md: "100px" }} // Cada botón ocupa el 50% en móvil
          fontSize="1rem"
        >
          Aplicar
        </CustomButton>
      </Flex>


    </Box>
  );
};

export default FilterDropdown;
