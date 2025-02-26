// src/utils/CustomButton.js
import React from 'react';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ variant = 'apply', children, ...props }) => {
    const baseStyles = {
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: 'md',
        fontWeight: 'medium',
    };

    const variantStyles = {
        cancel: {
            bg: 'gray.100',
            color: 'gray.800',
            border: '1px solid',
            borderColor: 'gray.300',
            _hover: { bg: 'gray.200' }
        },
        apply: {
            bg: '#040247',  
            color: 'white',
            _hover: { bg: '#070370' }  
        },
        delete: {
            bg: 'red.600',
            color: 'white',
            _hover: { bg: 'red.500' }
        },
        confirm: {
            bg: '#040247',  
            color: 'white',
            _hover: { bg: '#070370' }
        },
        secondary: {
            bg: 'gray.100',
            color: 'gray.800',
            _hover: { bg: 'gray.100' }
        },
        link: {
            bg: 'transparent',
            color: 'blue.500',
            textDecoration: 'underline',
            _hover: { bg: 'blue.50' },
        },
        outline: {
            bg: 'transparent',
            color: 'gray.900',
            border: '0.5px solid',
            borderColor: 'gray.300',
            _hover: { bg: 'gray.50',borderColor: 'blue.900'
                    
            }
        },
    };

    return (
        <Button 
            {...baseStyles}
            {...variantStyles[variant]}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CustomButton;