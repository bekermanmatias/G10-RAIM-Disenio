// src/config/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://g10-raim-disenio.onrender.com/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            
            console.error('Unauthorized access - 401');
        }
        return Promise.reject(error);
    }
);

export default instance;