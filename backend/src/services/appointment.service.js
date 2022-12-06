const { AppointmentRepository, ScheduleRepository } = require('../repositories');
const ErrorCreator = require('../utils/error_creator');

module.exports = class AppointmentService {
  constructor() {
    this.repository = new AppointmentRepository();
    this.scheduleRepository = new ScheduleRepository();
  }
  async create(data) {
    const createData = {
      ...data,
      wishList: JSON.parse(data.wishList)
    }
    await this.repository.create(createData);
    const schedule = await this.scheduleRepository.findOne(data.scheduleId);
    schedule.registerParticipantNumber += 1;
    if (schedule.registerParticipantNumber > schedule.total_participant) {
      throw new ErrorCreator('Schedule is full', 400);
    }
    await schedule.save();
    return;
  }

  async update(id, body) {
    const updateData = {
      ...body
    };
    await this.repository.update(id, updateData);
    return;
  }

  async find(reqQuery, userId) {
    const findOptions = {};
    if (reqQuery.page) {
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }

    if (reqQuery.orderBy) {
      findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
    }
    findOptions.where = {};
    if (reqQuery.scheduleId) {
      findOptions.where.scheduleId = reqQuery.scheduleId;
    }
    if (reqQuery.listType) {
      findOptions.where.listType = reqQuery.listType;
    }
    if (reqQuery.desiredDate) {
      findOptions.where.desiredDate = reqQuery.desiredDate;
    }
    if (reqQuery.userId) {
      findOptions.where.userId = reqQuery.userId;
    }
    if (userId) {
      findOptions.where.userId = userId;
    }
    findOptions.include = ['schedule', 'user'];

    if (reqQuery.isConfirmed) {
      findOptions.where.isConfirmed = reqQuery.isConfirmed;
    }

    return await this.repository.find(findOptions);
  }

  async findOne(id) {
    return await this.repository.findOne(id, ['schedule', 'user']);
  }

  async deleteAppointment(id) {
    return await this.repository.delete(id);
  }

  async deleteMulti(ids) {
    return await this.repository.deleteMulti(ids)
  }
};
