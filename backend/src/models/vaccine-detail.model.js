module.exports = (sequelize, Sequelize) => {
  const VaccineDetail = sequelize.define("vaccine_detail", {
    title: {
      type: Sequelize.TEXT
    },
    content: {
      type: Sequelize.TEXT
    },
    vaccineId: {
      field: 'vaccine_id',
      type: Sequelize.INTEGER,
    }
  }, {
    paranoid: true
  });

  return VaccineDetail;
};
