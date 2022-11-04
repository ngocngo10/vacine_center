module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.BOOLEAN
    },
    forgotPasswordToken: {
      type: Sequelize.STRING
    },
    refreshToken: {
      type: Sequelize.STRING(500)
    }
  });

  return User;
};
