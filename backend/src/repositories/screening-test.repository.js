const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const ScreeningTest = db.ScreeningTest;
const Op = db.Sequelize.Op;

module.exports = class ScreeningTestRepository extends BaseRepository {
  constructor() {
    super();
    this.model = ScreeningTest;
  }
};
