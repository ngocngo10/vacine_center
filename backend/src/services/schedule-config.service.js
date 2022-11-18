const { ScheduleConfigRepository } = require('../repositories');

module.exports = class ScheduleConfigService {
  constructor() {
    this.repository = new ScheduleConfigRepository();
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

  async findOne() {
    return await this.repository.find()[0];
  }
};
