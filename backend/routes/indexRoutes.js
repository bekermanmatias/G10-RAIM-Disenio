const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const reqRoutes = require('./requirementRoutes');

router.use('/user', userRoutes);
router.use('/requirements', reqRoutes);

module.exports = router;
