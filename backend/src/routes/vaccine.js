const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/index');
const { VaccineController } = require('../controllers');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, authMiddleware.isAdmin, VaccineController.create);
router.get('/', VaccineController.find);
router.get('/:id', VaccineController.findOne);
router.put('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, VaccineController.update);

router.delete(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  VaccineController.deleteSingle
);

module.exports = router;
