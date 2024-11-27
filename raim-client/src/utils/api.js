import axios from '../config/axios';

export const api = {
    login: async (credentials) => {
        try {
            const response = await axios.post('/login', credentials);
            return response;
        } catch (error) {
            // Manejo de errores para que puedas ver qué está pasando
            console.error('Error en la API:', error);
            throw error; // Re-lanzar el error para que se maneje en el componente
        }
    }
};