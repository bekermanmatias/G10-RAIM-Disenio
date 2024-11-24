const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importa el controlador

// Definir las rutas para cada operación
router.post('/', userController.createUser); // POST /users

module.exports = router;
