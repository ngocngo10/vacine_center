var express = require('express');
var router = express.Router();
const { VaccineController } = require('../controllers');

/* GET users listing. */
router.post('/', VaccineController.create);
router.get('/', VaccineController.find);
router.get('/:id', VaccineController.findOne);
router.put('/:id', VaccineController.update);
// router.delete('/:id', VaccineController.deleteCategory);

module.exports = router;