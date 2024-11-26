import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'; 
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/listUsers/Users';
import UserDetail from './components/listUsers/UserDetail';
import Requerimientos from './components/listRequirements/Requirements';
import CrearRequerimiento from './components/requirements/createRequirement/CreateRequirement';
import Settings from './components/settings/Settings';
import Login from './components/auth/Login'; 
import Register from './components/auth/Register'; 
import RequirementDetail from './components/requirements/RequirementDetail';
import FloatingCreateButton from './components/listRequirements/components/FloatingCreateButton';

const App = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
      }, []);
    const noSidebarRoutes = ['/login', '/register'];
    return (
        <Flex direction="column" minHeight="100vh">
            <Header />
            <Flex flex={1}>
                {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
                <Box flex={1} p={4}>
                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:nombreUsuario" element={<UserDetail />} />
                        <Route path="/requirements" element={<Requerimientos />} />
                        <Route path="/requirements/:codigo" element={<RequirementDetail />} /> 
                        <Route path="/crear-requerimiento" element={<CrearRequerimiento />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Requerimientos />} />
                    </Routes>
                    <FloatingCreateButton />
                </Box>
            </Flex>
            <Footer />
        </Flex>
    );
};

const AppWrapper = () => (
    <ChakraProvider>
        <Router>
            <App />
        </Router>
    </ChakraProvider>
);

export default AppWrapper;