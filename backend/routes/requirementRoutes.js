const express = require('express');
const router = express.Router();
const requirementController = require('../controllers/requirementController'); // Importa el controlador

// Definir las rutas para cada operación
router.get('/', requirementController.getRequirements);
router.post('/', requirementController.createRequirement);
router.get('/:codigo', requirementController.getReqByCodigo);
router.delete('/:codigo', requirementController.eliminarReq);
router.post('/:codigo', requirementController.actualizarDatosReq);

module.exports = router;