const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const VaccineItem = db.VaccineItem;
const Op = db.Sequelize.Op;

module.exports = class VaccineItemRepository extends BaseRepository {
  constructor() {
    super();
    this.model = VaccineItem;
  }
};
