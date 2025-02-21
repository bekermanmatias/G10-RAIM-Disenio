import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';
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
import { useAuth } from './context/authContext';

const App = () => {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    console.log('Auth status changed:', authStatus);
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    setIsAuthenticated(false);
  };

  const noSidebarRoutes = ['/login', '/register'];

  return (
    <Flex direction="column" minHeight="100vh">
      <Header toggleSidebar={toggleSidebar} />
      <Flex flex={1}>
        {!noSidebarRoutes.includes(location.pathname) && (
          <>
            <Sidebar onLogout={handleLogout} isOpen={isSidebarOpen} />
            {isSidebarOpen && (
              <div className="overlay" onClick={toggleSidebar} />
            )}
          </>
        )}
        <Box
          flex={1}
          p={4}
          ml={{ base: 0, md: '250px' }}
          mt={{ base: '142px', md: '55px' }} // Ajusta el margen superior según la altura del header en móvil y desktop
        >
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:nombreUsuario" element={<UserDetail />} />
                <Route path="/requirements" element={<Requerimientos />} />
                <Route path="/requirements/:codigo" element={<RequirementDetail />} />
                <Route path="/crear-requerimiento" element={<CrearRequerimiento />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Requerimientos />} />
                {/* Ruta catch-all para usuarios autenticados */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Ruta catch-all para usuarios no autenticados */}
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
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
