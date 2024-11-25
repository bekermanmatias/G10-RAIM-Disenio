const express = require('express');
const router = express.Router();
const categoriaReqController = require('../controllers/categoriaReqController');

router.post('/categorias-req', categoriaReqController.crearCategoria);
router.get('/categorias-req', categoriaReqController.obtenerTodasCategorias);
router.get('/categorias-req/:id', categoriaReqController.obtenerCategoriaPorId);
router.put('/categorias-req/:id', categoriaReqController.actualizarCategoria);
router.delete('/categorias-req/:id', categoriaReqController.eliminarCategoria);

module.exports = router;