var express = require('express');
var router = express.Router();
const { StaffController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.put(
  '/appointments/confirm/:id',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  StaffController.confirmAppointment
);

router.put(
  '/appointments/un-confirm/:id',
  authMiddleware.validateToken,
  authMiddleware.isStaff,
  StaffController.unConfirmAppointment
);

module.exports = router;
