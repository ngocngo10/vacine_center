const { ScheduleRepository } = require('../repositories');
const moment = require('moment-timezone');

module.exports = class ScheduleService {
  constructor() {
    this.repository = new ScheduleRepository();
  }
  async create(data) {
    await this.repository.create(data);
    return;
  }

  async update(id, body) {
    const updateData = {
      ...body
    };
    await this.repository.update(id, updateData);
    return;
  }

  async find(reqQuery) {
    const findOptions = {};
    if (reqQuery.page) {
      findOptions.limit = +reqQuery.perPage || 20;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }

    if (reqQuery.orderBy) {
      findOptions.order = ['caseNumber', 'ASC'];
    }
    const now = moment().format('YYYY-MM-DD');
    if (reqQuery.day) {
      findOptions.where = {
        day: reqQuery.day
      };
    } else {
      findOptions.where = {
        day: now
      };
    }

    return await this.repository.find(findOptions);
  }

  async findOne(id) {
    return await this.repository.findOne(id);
  }

  async deleteSchedule(id) {
    return await this.repository.delete(id);
  }

  async deleteMulti(ids) {
    return await this.repository.deleteMulti(ids);
  }
};
