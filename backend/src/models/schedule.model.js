module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define(
    'schedules',
    {
      day: {
        type: Sequelize.DATE
      },
      caseNumber: {
        field: 'case_number',
        type: Sequelize.INTEGER
      },
      startAt: {
        field: 'start_at',
        type: Sequelize.FLOAT
      },
      appointmentDuration: {
        field: 'appointment_duration',
        type: Sequelize.INTEGER
      },
      totalParticipant: {
        field: 'total_participant',
        type: Sequelize.INTEGER
      },
      registerParticipantNumber: {
        field: 'register_participant_number',
        type: Sequelize.INTEGER
      }
    },
    {
      paranoid: true
    }
  );

  return Schedule;
};
