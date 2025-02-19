const express = require('express');
const router = express.Router();
const archivosAdjController = require('../controllers/arcAdjuntoController.js');

router.get('/req'), archivosAdjController.getArcAByReq;
router.get('/com'), archivosAdjController.getArcAByCom;
router.post('/', archivosAdjController.createAA);
router.get('/url', archivosAdjController.getAAByUrl);
router.delete('/', archivosAdjController.eliminarArcA);

module.exports = router;