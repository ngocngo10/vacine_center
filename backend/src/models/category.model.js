module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("categories", {
    name: {
      type: Sequelize.STRING
    },
    categoryGroup: {
      field: 'category_group',
      type: Sequelize.ENUM(['AGE', 'DISEASE'])
    }
  }, {
    paranoid: true
  });

  return Category;
};
