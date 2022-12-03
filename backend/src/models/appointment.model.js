module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define(
    'appointments',
    {
      patientId: {
        field: 'patient_id',
        type: Sequelize.INTEGER
      },
      doctorId: {
        field: 'doctor_id',
        type: Sequelize.INTEGER
      },
      scheduleId: {
        field: 'schedule_id',
        type: Sequelize.INTEGER
      },
      isConfirmed: {
        field: 'is_confirmed',
        type: Sequelize.BOOLEAN
      },
      baseContent: {
        field: 'base_content',
        type: Sequelize.TEXT
      }
    },
    {
      paranoid: true
    }
  );

  return Appointment;
};
