const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/index');
const { VaccineItemController } = require('../controllers');

/* GET users listing. */
router.post('/', VaccineItemController.create);
router.get('/', VaccineItemController.find);
router.get('/:id', VaccineItemController.findOne);

router.delete('/:id', VaccineItemController.deleteSingle);

router.delete('/', VaccineItemController.deleteMulti);

module.exports = router;
