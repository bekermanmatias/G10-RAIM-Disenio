import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Users from './components/Users';
import Requirements from './components/Requirements';
import Settings from './components/Settings';
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
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/" element={<Requirements />} /> {/* Ruta predeterminada */}
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;