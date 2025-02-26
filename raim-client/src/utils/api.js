import axios from '../config/axios';

export const api = {
    login: async (credentials) => {
        try {
            const response = await axios.post('/login', credentials);
            return response;
        } catch (error) {
            console.error('Error en la API:', error);
            throw error;
        }
    }
};