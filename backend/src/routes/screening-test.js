var express = require('express');
var router = express.Router();
const { ScreeningTestController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.post(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  ScreeningTestController.create
);
router.get('/', ScreeningTestController.find);
router.get('/:id', ScreeningTestController.findOne);
router.put(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  ScreeningTestController.update
);

module.exports = router;
