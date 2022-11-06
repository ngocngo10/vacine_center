const db = require("../models");
const BaseRepository = require("../utils/base_repository");
const Category = db.categories;
const Op = db.Sequelize.Op;

module.exports = class CategoryRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Category;
  }
}
