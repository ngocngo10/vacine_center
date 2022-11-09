var express = require('express');
var router = express.Router();
const { CategoryController } = require('../controllers');

/* GET users listing. */
router.post('/', CategoryController.create);
router.get('/', CategoryController.find);
router.get('/:id', CategoryController.findOne);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
