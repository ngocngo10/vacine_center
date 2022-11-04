module.exports = (sequelize, Sequelize) => {
  const Vaccine = sequelize.define("vaccines", {
    name: {
      type: Sequelize.STRING
    },
    origin: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    injectedNumberTotal: {
      field: 'injected_number_total',
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    },
    madeDay: {
      field: 'made_day',
      type: Sequelize.DATE
    },
    expiratedDate: {
      field: 'expirated_date',
      type: Sequelize.DATE
    }
  });

  return Vaccine;
};
