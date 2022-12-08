module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define(
    'appointments',
    {
      scheduleId: {
        field: 'schedule_id',
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER
      },
      patientName: {
        field: 'patient_name',
        type: Sequelize.STRING
      },
      birthday: {
        field: 'birthday',
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
      representativeName: {
        field: 'representative_name',
        type: Sequelize.STRING
      },
      representativePhoneNumber: {
        field: 'representative_phone_number',
        type: Sequelize.STRING
      },
      relative: {
        type: Sequelize.STRING
      },
      desiredDate: {
        type: Sequelize.DATE,
        field: 'desired_date'
      },
      listType: {
        type: Sequelize.STRING,
        field: 'list_type'
      },
      wishList: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: 'wish_list'
      },
      isConfirmed: {
        field: 'is_confirmed',
        type: Sequelize.BOOLEAN
      },
      isCheckIn: {
        field: 'is_check_in',
        type: Sequelize.BOOLEAN,
        default: false
      }
    },
    {
      paranoid: true
    }
  );

  return Appointment;
};
