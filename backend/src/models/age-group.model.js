module.exports = (sequelize, Sequelize) => {
  const AgeGroup = sequelize.define(
    'age_groups',
    {
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING(2000)
      },
    },
    {
      paranoid: true
    }
  );

  return AgeGroup;
};
