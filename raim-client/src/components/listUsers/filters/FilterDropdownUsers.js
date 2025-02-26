// src/components/listUsers/filters/FilterDropdownUsers.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  Button
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import CustomButton from '../../../utils/CustomButton';

const FilterDropdownUsers = ({ onClose, onApply, initialFilters, cargos = [], departamentos = [] }) => {
  // Usamos "cargo" y "departamento" para que coincidan con la nomenclatura deseada.
  const [filters, setFilters] = useState({
    cargo: [],
    departamento: []
  });

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const filterOptions = {
    cargo: cargos,
    departamento: departamentos
  };

  const handleCheckboxChange = (group, values) => {
    setFilters(prev => ({
      ...prev,
      [group]: values
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  // Función para formatear el label del botón y truncarlo (si es mayor a 20 caracteres)
const formatButtonLabel = (group) => {
    const selected = filters[group] || []; // Asegurarse de que sea un array vacío si está undefined
    if (selected.length === 0) {
      return group.charAt(0).toUpperCase() + group.slice(1);
    }
    const fullLabel = selected.join(', ');
    const maxLength = 50;
    if (fullLabel.length > maxLength) {
      return `${fullLabel.slice(0, maxLength)}... (${selected.length})`;
    }
    return fullLabel;
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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
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
      <MenuList width="100%">
        <CheckboxGroup
          colorScheme="blue"
          value={filters[group]}
          onChange={(values) => handleCheckboxChange(group, values)}
        >
          <Stack spacing={2} px={4} py={2}>
            {options.map(option => (
              <Checkbox key={option} value={option}>
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
        width="100%"
      >
        {Object.entries(filterOptions).map(([group, options]) => (
          <Box key={group} flex="1" minWidth="180px">
            {renderDropdown(group, options)}
          </Box>
        ))}
      </Flex>
      <Flex justify="flex-end" mt={4}>
        <CustomButton variant="cancel" onClick={onClose} width="100px" mr={2}>
          Cancelar
        </CustomButton>
        <CustomButton variant="apply" onClick={handleApply} width="100px">
          Aplicar
        </CustomButton>
      </Flex>
    </Box>
  );
};

export default FilterDropdownUsers;
