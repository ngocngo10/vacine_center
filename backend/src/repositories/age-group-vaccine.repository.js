const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const AgeGroupVaccine = db.AgeGroupVaccine;
const Op = db.Sequelize.Op;

module.exports = class AgeGroupVaccineRepository extends BaseRepository {
  constructor() {
    super();
    this.model = AgeGroupVaccine;
  }
};
