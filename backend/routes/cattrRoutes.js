const express = require('express');
const router = express.Router();
const cattrController = require('../controllers/catTRController');

router.get('/', cattrController.getCatTR);
router.post('/', cattrController.createCatTR);
router.get('/desc', cattrController.getCatByDesc);
router.delete('/', cattrController.eliminarCat);

module.exports = router;