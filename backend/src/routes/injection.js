const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/index');
const { InjectionController } = require('../controllers');

/* GET users listing. */
router.post(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  InjectionController.bulkCreate
);
router.get('/', InjectionController.find);
router.get('/:id', InjectionController.findOne);
router.put(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  InjectionController.update
);

router.delete(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  InjectionController.deleteInjection
);

router.delete(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  InjectionController.deleteMulti
);

module.exports = router;
