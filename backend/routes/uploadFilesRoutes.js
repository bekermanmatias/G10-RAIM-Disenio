const express = require('express');
const router = express.Router();
const archivosAdjController = require('../controllers/arcAdjuntoController.js');
const upload = require('../config/multerConfig.js');

router.get('/req', archivosAdjController.getArcAByReq);
router.get('/com', archivosAdjController.getArcAByCom);
router.post('/',  upload.single('archivo'), archivosAdjController.createAA);
router.get('/:url', archivosAdjController.getAAByUrl);
router.delete('/', archivosAdjController.eliminarArcA);

module.exports = router;