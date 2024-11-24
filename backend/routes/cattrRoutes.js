const express = require('express');
const router = express.Router();
const cattrController = require('../controllers/catTRController');

router.get('/', cattrController.getCatTR);
router.post('/', cattrController.createCatTR);
router.get('/:descripcion', cattrController.getCatByDesc);
router.delete('/:descripcion', cattrController.eliminarCat);

module.exports = router;