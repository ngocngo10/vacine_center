module.exports = (sequelize, Sequelize) => {
  const Vaccine = sequelize.define(
    'vaccines',
    {
      categoryId: {
        field: 'category_id',
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(5000)
      },
      vaccineCode: {
        field: 'vaccine_code',
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
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
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    },
    {
      paranoid: true
    }
  );

  return Vaccine;
};
