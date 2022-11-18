var express = require('express');
var router = express.Router();
const { VaccineDetailController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.post(
  '/',
  [authMiddleware.validateToken, authMiddleware.isAdmin],
  VaccineDetailController.create
);
router.get('/', VaccineDetailController.find);
router.get('/:id', VaccineDetailController.findOne);
router.put(
  '/:id',
  [authMiddleware.validateToken, authMiddleware.isAdmin],
  VaccineDetailController.update
);
router.delete(
  '/:id',
  [authMiddleware.validateToken, authMiddleware.isAdmin],
  VaccineDetailController.deleteVaccineDetail
);

module.exports = router;
