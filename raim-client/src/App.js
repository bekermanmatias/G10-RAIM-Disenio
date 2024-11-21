import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import Requirements from './components/requirements/listRequirements/Requirements';
import CrearRequerimiento from './components/requirements/createRequirement/CreateRequirement';
import Settings from './components/settings/Settings';
import Login from './components/auth/Login'; 
import Register from './components/auth/Register'; 
import FloatingCreateButton from './components/requirements/listRequirements/FloatingCreateButton'; 
import './styles/App.css';

const App = () => {

    const location = useLocation();

    const noSidebarRoutes = ['/login', '/register'];
    return (
        <div className="app">
            <Header />
            <div className="container">
                {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
                <main className="main-content">
                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/requirements" element={<Requirements />} />
                        <Route path="/crear-requerimiento" element={<CrearRequerimiento />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
                        <Route path="/register" element={<Register />} /> {/* Ruta para Register */}
                        <Route path="/" element={<Requirements />} />
                    </Routes>
                    <FloatingCreateButton />
                </main>
            </div>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;