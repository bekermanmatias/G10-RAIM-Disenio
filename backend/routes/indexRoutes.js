const express = require('express');
const router = express.Router();

// Importar rutas
const userRoutes = require('./userRoutes');
const requirementRoutes = require('./requirementRoutes');

router.use('/user', userRoutes);
router.use('/requirement', requirementRoutes);

module.exports = router;
