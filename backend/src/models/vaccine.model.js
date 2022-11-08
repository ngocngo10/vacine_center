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
    injectionRoute: {
      type: Sequelize.TEXT,
      field: 'injection_route'
    },
    contraindications: {
      type: Sequelize.TEXT
    },
    drugInteractions: {
      field: 'drug_interaction',
      type: Sequelize.TEXT,
    },
    sideEffects: {
      field: 'side_effects',
      type: Sequelize.TEXT,
    },
    conserve: {
      type: Sequelize.TEXT,
    },
    affectPregnancy: {
      field: 'affect_pregnancy',
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
