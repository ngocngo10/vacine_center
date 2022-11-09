module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointments", {
    patientId: {
      name: 'patient_id',
      type: Sequelize.INTEGER
    },
    vaccineId: {
      name: 'vaccine_id',
      type: Sequelize.INTEGER
    },
    injectedTime: {
      name: 'injected_time',
      type: Sequelize.DATE
    },
    registerTimeId: {
      name: 'register_time_id',
      type: Sequelize.INTEGER
    },
    isConfirmed: {
      name: 'is_confirmed',
      type: Sequelize.BOOLEAN
    }
  }, {
    paranoid: true
  });

  return Appointment;
};