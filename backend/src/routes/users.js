var express = require('express');
var router = express.Router();
const { UserController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, authMiddleware.isAdmin, UserController.register);
router.get('/', authMiddleware.validateToken, authMiddleware.isAdmin, UserController.find);
router.get('/:id', authMiddleware.validateToken, UserController.findOne);
router.put('/:id', authMiddleware.validateToken, UserController.update);
router.delete(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  UserController.deleteUser
);
router.delete(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  UserController.deleteMulti
);

module.exports = router;
