const express = require('express');
const router = express.Router();
const stateController = require('../controllers/estadoController');

router.get('/', stateController.getStates);
router.post('/', stateController.createState);
router.get('/desc', stateController.getStateByDesc);
router.delete('/', stateController.eliminarState);

module.exports = router;