const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const Category = db.Category;
const Op = db.Sequelize.Op;

module.exports = class CategoryRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Category;
  }
};
