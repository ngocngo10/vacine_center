var express = require('express');
var router = express.Router();
const { AgeGroupController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, authMiddleware.isAdmin, AgeGroupController.create);
router.get('/', AgeGroupController.find);
router.get('/:id', AgeGroupController.findOne);
router.put('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, AgeGroupController.update);
router.delete(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  AgeGroupController.deleteAgeGroup
);
router.delete(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  AgeGroupController.deleteMulti
);

module.exports = router;
