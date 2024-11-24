const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const reqRoutes = require('./requirementRoutes');
const CTRRoutes = require('./cattrRoutes');
const TRRoutes = require('./tipoReqRoutes');

router.use('/user', userRoutes);
router.use('/requirements', reqRoutes);
router.use('/catiporeq',CTRRoutes);
router.use('/tiporeq',TRRoutes);

module.exports = router;
