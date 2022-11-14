const db = require("../models");
const BaseRepository = require("../utils/base_repository");
const Patient = db.Patient;
const Op = db.Sequelize.Op;

module.exports = class PatientRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Patient;
  }
}
