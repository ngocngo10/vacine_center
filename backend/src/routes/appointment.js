var express = require('express');
var router = express.Router();
const { AppointmentController } = require('../controllers');
const { authMiddleware } = require('../middlewares/index');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, AppointmentController.create);
router.get('/', AppointmentController.find);
router.get('/:id', AppointmentController.findOne);
router.put('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, AppointmentController.update);
router.delete('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, AppointmentController.deleteAppointment);
router.delete('/', authMiddleware.validateToken, authMiddleware.isAdmin, AppointmentController.deleteMulti);

module.exports = router;
