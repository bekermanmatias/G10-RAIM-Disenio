import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/authContext';
import './styles/global.css';


ReactDOM.render(
    <AuthProvider>
    <React.StrictMode>
        <App />
    </React.StrictMode>
    </AuthProvider>,
    document.getElementById('root')
);