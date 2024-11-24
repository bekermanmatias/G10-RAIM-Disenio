const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa el controlador

// Definir las rutas para cada operación
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:username', userController.getUserByUsername);
router.delete('/:username', userController.eliminarUsuario);
router.post('/:username', userController.actualizarDatosUser);

module.exports = router;
