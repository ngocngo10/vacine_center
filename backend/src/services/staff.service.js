const { ScheduleRepository, AppointmentRepository } = require('../repositories');
const { sendEmailConfirmAppointment } = require('../utils/send_mail');

module.exports = class StaffService {
  constructor() {
    this.repository = new ScheduleRepository();
    this.appointmentRepo = new AppointmentRepository();
  }

  async confirmAppointment(appointmentId) {
    const appointment = await this.appointmentRepo.findOne(appointmentId, ['user', 'schedule']);
    console.log(appointment);
    appointment.isConfirmed = true;
    await appointment.save();
    const data = {
      patientName: appointment.patientName,
      startAt: appointment.schedule.startAt
    };
    sendEmailConfirmAppointment(appointment.user.email, data);
    return;
  }

  async confirmCheckIn(appointmentId) {
    const appointment = await this.appointmentRepo.findOne(appointmentId, ['user']);
    appointment.isCheckIn = true;
    await appointment.save();
    return;
  }
};
