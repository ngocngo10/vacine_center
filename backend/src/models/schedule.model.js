module.exports = (sequelize, Sequelize) => {
  const Schedule= sequelize.define("schedules", {
    day: {
      type: Sequelize.DATE
    },
    startAt: {
      field: 'start_at',
      type: Sequelize.FLOAT
    },
    endAt: {
      field: 'end_at',
      type: Sequelize.FLOAT
    },
    appointmentDuration: {
      field: 'appointment_duration',
      type: Sequelize.INTEGER
    },
    participantNumber: {
      field: 'participant_number',
      type: Sequelize.INTEGER
    },
    registedParticipantNumber: {
      field: 'registed_participant_number',
      type: Sequelize.INTEGER
    },
  }, {
    paranoid: true
  });

  return Schedule;
};
