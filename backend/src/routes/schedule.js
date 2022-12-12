var express = require('express');
var router = express.Router();
const { ScheduleController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, authMiddleware.isAdmin, ScheduleController.create);
router.get('/', ScheduleController.find);
router.get('/:id', ScheduleController.findOne);
router.put('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, ScheduleController.update);
router.delete(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  ScheduleController.deleteSchedule
);
router.delete(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isAdmin,
  ScheduleController.deleteMulti
);

module.exports = router;
