module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    'categories',
    {
      name: {
        type: Sequelize.STRING
      },
      categoryGroup: {
        field: 'category_group',
        type: Sequelize.ENUM(['AGE', 'DISEASE'])
      },
      image: {
        type: Sequelize.STRING(2000)
      },
      injectionSchedule: {
        field: 'injection_schedule',
        type: Sequelize.TEXT
      }
    },
    {
      paranoid: true
    }
  );

  return Category;
};
