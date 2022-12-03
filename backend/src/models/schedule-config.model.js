module.exports = (sequelize, Sequelize) => {
  const ScheduleConfig = sequelize.define(
    'schedule_configs',
    {
      startAt: {
        field: 'start_at',
        type: Sequelize.FLOAT
      },
      endTime: {
        field: 'end_at',
        type: Sequelize.FLOAT
      },
      restTime: {
        field: 'rest_at',
        type: Sequelize.FLOAT
      },
      appointmentDuration: {
        field: 'appointment_duration',
        type: Sequelize.FLOAT
      },
      participantNumber: {
        field: 'participant_number',
        type: Sequelize.INTEGER
      },
      applyFrom: {
        field: 'apply_from',
        type: Sequelize.DATE
      }
    },
    {
      paranoid: true
    }
  );

  return ScheduleConfig;
};
