var express = require('express');
var router = express.Router();
const { AgeGroupController } = require('../controllers');

/* GET users listing. */
router.post('/', AgeGroupController.create);
router.get('/', AgeGroupController.find);
router.get('/:id', AgeGroupController.findOne);
router.put('/:id', AgeGroupController.update);
router.delete('/:id', AgeGroupController.deleteAgeGroup);

module.exports = router;
