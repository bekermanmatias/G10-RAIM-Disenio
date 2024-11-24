const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const reqRoutes = require('./requirementRoutes');
const CTRRoutes = require('./cattrRoutes');
const TRRoutes = require('./tipoReqRoutes');
const stateRoutes = require('./stateRoutes');
const prioridadRoutes = require('./prioridadRoutes');
const departRoutes = require('./departamentoRoutes');

router.use('/user', userRoutes);
router.use('/requirement', reqRoutes);
router.use('/catiporeq',CTRRoutes);
router.use('/tiporeq',TRRoutes);
router.use('/estado', stateRoutes);
router.use('/prioridad', prioridadRoutes);
router.use('/departamento', departRoutes);

module.exports = router;
