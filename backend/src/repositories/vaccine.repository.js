const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const Vaccine = db.Vaccine;
const VaccineCategory = db.VaccineCategory;
const Op = db.Sequelize.Op;

module.exports = class VaccineRepository extends BaseRepository {
  constructor() {
    super();
    this.vaccineeCategoryModel = VaccineCategory;
    this.model = Vaccine;
  }
};
