// src/utils/LoadingSpinner.js
import React from 'react';
import { Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
    return (
      <div 
        style={{
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          height: '100%'
        }}
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.900'
          size='xl'
        />
      </div>
    );
  };

export default LoadingSpinner;