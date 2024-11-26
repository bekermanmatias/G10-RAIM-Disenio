import axios from '../config/axios';

export const api = {
    login: (credentials) => axios.post('/login', credentials),
};