import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import Requirements from './components/requirements/listRequirements/Requirements';
import CrearRequerimiento from './components/requirements/createRequirement/CreateRequirement';
import Settings from './components/settings/Settings';
import FloatingCreateButton from './components/requirements/listRequirements/FloatingCreateButton'; // Importa el nuevo componente
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header />
                <div className="container">
                    <Sidebar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/users" element={<Users />} />
                            <Route path="/requirements" element={<Requirements />} />
                            <Route path="/crear-requerimiento" element={<CrearRequerimiento />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/" element={<Requirements />} />
                        </Routes>
                        <FloatingCreateButton />
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;