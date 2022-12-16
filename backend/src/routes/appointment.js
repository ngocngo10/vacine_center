var express = require('express');
var router = express.Router();
const { AppointmentController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, AppointmentController.create);
router.get('/', authMiddleware.validateToken, AppointmentController.find);
router.get('/:id', AppointmentController.findOne);
router.put(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isUser,
  AppointmentController.update
);
router.delete(
  '/:id',
  authMiddleware.validateToken,
  authMiddleware.isUser,
  AppointmentController.deleteAppointment
);
router.delete(
  '/',
  authMiddleware.validateToken,
  authMiddleware.isUser,
  AppointmentController.deleteMulti
);

module.exports = router;
