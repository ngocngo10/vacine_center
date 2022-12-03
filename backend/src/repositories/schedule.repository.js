const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const Schedule = db.Schedule;
const Op = db.Sequelize.Op;

module.exports = class ScheduleRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Schedule;
  }
};
