module.exports = (sequelize, Sequelize) => {
  const ScreeningTest = sequelize.define(
    'screening_tests',
    {
      injectionHistory: {
        type: Sequelize.TEXT
      },
      medicalHistory: {
        type: Sequelize.STRING,
        field: 'medical_history'
      },
      appointmentId: {
        type: Sequelize.TEXT
      },
      temperature: {
        type: Sequelize.STRING
      },
      circuit: {
        type: Sequelize.STRING
      },
      bloodPressure: {
        type: Sequelize.STRING,
        field: 'blood_pressure'
      },
      breath:{
        type: Sequelize.STRING
      },
      isQualified: {
        field: 'is_qualified',
        type: Sequelize.BOOLEAN
      },
      rejectReason: {
        field: 'reject_reason',
        type: Sequelize.TEXT
      }
    },
    {
      paranoid: true
    }
  );

  return ScreeningTest;
};
