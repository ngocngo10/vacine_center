const db = require("../models");
const BaseRepository = require("../utils/base_repository");
const VaccineDetail = db.VaccineDetail;
const Op = db.Sequelize.Op;

module.exports = class VaccineDetailRepository extends BaseRepository {
  constructor() {
    super();
    this.model = VaccineDetail;
  }
}
