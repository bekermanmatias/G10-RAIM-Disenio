const express = require('express');
const router = express.Router();
const prioController = require('../controllers/prioridadController');

router.get('/', prioController.getPrioridades);
router.post('/', prioController.createPrioridad);
router.get('/desc', prioController.getPrioByDesc);
router.delete('/', prioController.eliminarPrioridad);

module.exports = router;