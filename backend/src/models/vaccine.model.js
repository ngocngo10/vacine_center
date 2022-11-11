module.exports = (sequelize, Sequelize) => {
  const Vaccine = sequelize.define("vaccines", {
    name: {
      type: Sequelize.STRING(5000)
    },
    image: {
      type: Sequelize.STRING(2000)
    },
    description: {
      type: Sequelize.TEXT
    },
    origin: {
      type: Sequelize.TEXT
    },
    injectedNumberTotal: {
      field: 'injected_number_total',
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    }
  }, {
    paranoid: true
  });

  return Vaccine;
};
