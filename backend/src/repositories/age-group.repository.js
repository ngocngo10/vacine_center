const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const AgeGroup = db.AgeGroup;
const Op = db.Sequelize.Op;

module.exports = class AgeGroupRepository extends BaseRepository {
  constructor() {
    super();
    this.model = AgeGroup;
  }
};
