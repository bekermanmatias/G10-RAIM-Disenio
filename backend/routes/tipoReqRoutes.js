const express = require('express');
const router = express.Router();
const trController = require('../controllers/tipoReqController');

router.get('/', trController.getTiposReq);
router.post('/', trController.createTipoReq);
router.get('/:codigo', trController.getTipoByCodigo);
router.delete('/:codigo', trController.eliminarTipoReq);

module.exports = router;