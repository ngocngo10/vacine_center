var express = require('express');
var router = express.Router();
const { AuthController } = require('../controllers');


/* GET users listing. */
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);
router.post('/refreshToken', AuthController.refreshToken);

module.exports = router;
