const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const ScheduleConfig = db.ScheduleConfig;
const Op = db.Sequelize.Op;
const moment = require('moment-timezone');

module.exports = class ScheduleConfigRepository extends BaseRepository {
  constructor() {
    super();
    this.model = ScheduleConfig;
  }
  async find() {
    const configs = await this.model.findAll({
      order: [['applyFrom', 'DESC']],
      take: 2
    });
    const now = moment();
    const lastConfigDate = moment(configs[0].applyFrom);
    if (lastConfigDate.diff(now, 'days') >= 0) {
      return configs.reverse();
    }
    return [configs[0]];
  }
};
