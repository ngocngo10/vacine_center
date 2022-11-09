module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patients", {
    representative: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    isMale: {
      type: Sequelize.BOOLEAN
    },
    birthday: {
      type: Sequelize.DATE
    }
  }, {
    paranoid: true
  });

  return Patient;
};