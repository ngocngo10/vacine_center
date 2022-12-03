const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const ScheduleConfig = db.ScheduleConfig;
const Op = db.Sequelize.Op;

module.exports = class ScheduleConfigRepository extends BaseRepository {
  constructor() {
    super();
    this.model = ScheduleConfig;
  }
  async find() {
    return (await this.model.findAll())[0];
  }
};
