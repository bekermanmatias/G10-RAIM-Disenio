const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.get('/', departamentoController.getDeparts);
router.post('/', departamentoController.createDepart);
router.get('/nombre', departamentoController.getDepartByNom);
router.delete('/', departamentoController.eliminarDepart);

module.exports = router;