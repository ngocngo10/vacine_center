const { ScheduleConfigRepository, ScheduleRepository } = require('../repositories');
const { Op } = require('sequelize');
const jobs = require('../jobs/create-schedule.job');
const moment = require('moment-timezone');
const ErrorCreator = require('../utils/error_creator');
const { sequelize } = require('../models');

module.exports = class ScheduleConfigService {
  constructor() {
    this.repository = new ScheduleConfigRepository();
    this.scheduleRepository = new ScheduleRepository();
  }
  async create(data) {
    const t = await sequelize.transaction();
    try {
      await this.repository.create(data);
      const toDate = moment().tz('Asia/Ho_Chi_Minh').add(20, 'days').startOf('day');
      const fromDate = moment(data.applyFrom).startOf('day');
      // if (fromDate.diff(moment().tz('Asia/Ho_Chi_Minh'), 'day') <= 0) {
      //   throw new ErrorCreator('Vui lòng chọn ngày áp dụng lớn hơn ngày hiện tại!', 400);
      // }
      await this.scheduleRepository.model.destroy({
        where: {
          day: {
            [Op.gte]: data.applyFrom
          }
        },
        force: true
      });
      await jobs.createSchedules(fromDate, toDate);
      await t.commit();
      return; 
    } catch (error) {
      await t.rollback();
      throw error;
    }
    
  }

  async update(id, body) {
    const t = await sequelize.transaction();
    try {
      const updateData = {
        ...body
      };
  
      await this.scheduleRepository.model.destroy({
        where: {
          day: {
            [Op.gte]: body.applyFrom
          }
        },
        force: true
      });
      // const toDate = moment().tz('Asia/Ho_Chi_Minh').endOf('month').startOf('day');
      const toDate = moment().tz('Asia/Ho_Chi_Minh').add(20, 'days').startOf('day');
      const fromDate = moment(body.applyFrom).tz('Asia/Ho_Chi_Minh').startOf('day');
      // if (fromDate.diff(moment().tz('Asia/Ho_Chi_Minh'), 'day') <= 0) {
      //   throw new ErrorCreator('Vui lòng chọn ngày áp dụng lớn hơn ngày hiện tại!', 400);
      // }
      await this.repository.update(id, updateData);
      await jobs.createSchedules(fromDate, toDate);
      await t.commit();
      return;
    } catch (error) {
      await t.rollback();
      throw error;
    }
    
  }

  async find() {
    return await this.repository.find();
  }
};
