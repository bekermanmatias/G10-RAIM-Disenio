const express = require('express');
const router = express.Router();
const comController = require('../controllers/comentarioController');

router.get('/:codReq', comController.getCommentsByCodReq);
router.post('/', comController.createComment);
router.delete('/', comController.eliminarComment);
router.post('/update/:codigo', comController.actualizarDatosComentario);

module.exports = router;