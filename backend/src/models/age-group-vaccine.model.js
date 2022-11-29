module.exports = (sequelize, Sequelize) => {
  const AgeGroupVaccine = sequelize.define(
    'age_group_vaccines',
    {
      vaccineId: {
        field: 'vaccine_id',
        type: Sequelize.STRING
      },
      ageGroupId: {
        field: 'age_group_id',
        type: Sequelize.STRING
      }
    },
    {
      paranoid: true
    }
  );

  return AgeGroupVaccine;
};
