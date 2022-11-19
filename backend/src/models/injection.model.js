module.exports = (sequelize, Sequelize) => {
  const Injection = sequelize.define(
    'injections',
    {
      patientId: {
        field: 'patient_id',
        type: Sequelize.INTEGER
      },
      nurseId: {
        field: 'nurse_id',
        type: Sequelize.INTEGER
      },
      nurseId: {
        field: 'nurse_id',
        type: Sequelize.INTEGER
      },
      birthday: {
        type: Sequelize.DATE
      }
    },
    {
      paranoid: true
    }
  );

  return Injection;
};
