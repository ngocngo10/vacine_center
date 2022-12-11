module.exports = (sequelize, Sequelize) => {
  const Injection = sequelize.define(
    'injections',
    {
      appointmentId: {
        field: 'appointment_id',
        type: Sequelize.INTEGER
      },
      nurseId: {
        field: 'nurse_id',
        type: Sequelize.INTEGER
      },
      vaccineId: {
        field: 'vaccine_id',
        type: Sequelize.INTEGER
      },
      injectionAt: {
        field: 'injection_at',
        type: 'TIMESTAMP'
      }
    },
    {
      paranoid: true
    }
  );

  return Injection;
};
