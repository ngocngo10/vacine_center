module.exports = (sequelize, Sequelize) => {
  const VaccineCategory = sequelize.define(
    'vaccine_categories',
    {
      vaccineId: {
        field: 'vaccine_id',
        type: Sequelize.INTEGER
      },
      categoryId: {
        field: 'category_id',
        type: Sequelize.INTEGER
      }
    },
    {
      paranoid: true
    }
  );

  return VaccineCategory;
};
