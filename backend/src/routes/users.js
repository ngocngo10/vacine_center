var express = require('express');
var router = express.Router();
const { UserController } = require('../controllers');

/* GET users listing. */
router.post('/', UserController.register);
router.get('/', UserController.find);
router.get('/:id', UserController.findOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleteUser);
router.delete('/', UserController.deleteMulti);

module.exports = router;
