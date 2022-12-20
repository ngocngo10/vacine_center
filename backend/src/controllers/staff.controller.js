const { StaffService } = require('../services');
const ErrorCreator = require('../utils/error_creator');
const staffService = new StaffService();
async function confirmAppointment(req, res, next) {
  try {
    await staffService.confirmAppointment(req.params.id);
    return res.json({
      message: 'Appointment is confirmed successfully'
    });
  } catch (error) {
    next(error);
  }
}

async function unConfirmAppointment(req, res, next) {
  try {
    await staffService.unConfirmAppointment(req.params.id);
    return res.json({
      message: 'Appointment is not confirmed'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  confirmAppointment,
  unConfirmAppointment
};
