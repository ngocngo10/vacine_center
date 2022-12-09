module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define(
    'patients',
    {
      representative: {
        type: Sequelize.INTEGER
      },
      patientName: {
        field: 'patient_name',
        type: Sequelize.STRING
      },
      patientCode: {
        field: 'patient_code',
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      phoneNumber: {
        field: 'phone_number',
        type: Sequelize.STRING
      },
      gender: {
        field: 'gender',
        type: Sequelize.BOOLEAN
      },
      province: {
        field: 'province',
        type: Sequelize.STRING
      },
      district: {
        field: 'district',
        type: Sequelize.STRING
      },
      ward: {
        field: 'ward',
        type: Sequelize.STRING
      },
      street: {
        field: 'street',
        type: Sequelize.STRING
      },
    },
    {
      paranoid: true,
      hooks: {
        afterCreate: async (patient, options) => {
          patient.patientCode = 'P' + ('0000' + patient.id).slice(-4);
          console.log(patient);
          await patient.save();
        }
      }
    }
  );

  return Patient;
};
