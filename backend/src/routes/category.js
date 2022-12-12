var express = require('express');
var router = express.Router();
const { CategoryController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, authMiddleware.isAdmin, CategoryController.create);
router.get('/', CategoryController.find);
router.get('/:id', CategoryController.findOne);
router.put('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, CategoryController.update);
router.delete(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  CategoryController.deleteCategory
);
router.delete(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  CategoryController.deleteMulti
);

module.exports = router;
