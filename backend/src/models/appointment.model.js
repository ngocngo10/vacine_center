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
      patientId: {
        field: 'patient_id',
        type: Sequelize.STRING
      },
      relative: {
        type: Sequelize.STRING
      },
      desiredDate: {
        type: Sequelize.DATE,
        field: 'desired_date'
      },
      wishList: {
        type: Sequelize.ARRAY(Sequelize.STRING(2000)),
        field: 'wish_list'
      },
      isConfirmed: {
        field: 'is_confirmed',
        type: Sequelize.BOOLEAN
      },
      checkInAt: {
        field: 'check_in_at',
        type: Sequelize.DATE
      },
      postInjectionReaction: {
        field: 'post_injection_reaction',
        type: Sequelize.TEXT
      },
      isPaid: {
        field: 'is_paid',
        type: Sequelize.BOOLEAN
      }
    },
    {
      paranoid: true
    }
  );

  return Appointment;
};
