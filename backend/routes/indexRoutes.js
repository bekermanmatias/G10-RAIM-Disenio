const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const reqRoutes = require('./requirementRoutes');
const CTRRoutes = require('./cattrRoutes');
const TRRoutes = require('./tipoReqRoutes');
const stateRoutes = require('./stateRoutes');
const prioridadRoutes = require('./prioridadRoutes');
const departRoutes = require('./departamentoRoutes');
const loginRoutes = require('./loginRoutes');
const archivoAdjRoutes = require('./uploadFilesRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/requirement', reqRoutes);
router.use('/catiporeq',CTRRoutes);
router.use('/tiporeq',TRRoutes);
router.use('/estado', stateRoutes);
router.use('/prioridad', prioridadRoutes);
router.use('/departamento', departRoutes);
router.use('/login', loginRoutes);
router.use('/uploadFiles', archivoAdjRoutes);
router.use('/comment',commentRoutes);

module.exports = router;
