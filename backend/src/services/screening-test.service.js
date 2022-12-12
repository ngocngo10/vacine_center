const { ScreeningTestRepository, AppointmentRepository } = require('../repositories');

module.exports = class ScreeningTestService {
  constructor() {
    this.repository = new ScreeningTestRepository();
    this.appointmentRepo = new AppointmentRepository();
  }

  async create(data) {
    await this.repository.create(data);
    return;
  }

  async update(id, data) {
    await this.repository.update(id, data);
    return;
  }

  async find(req) {
    const findOptions = { where: {} };
    if (req.query.page) {
      findOptions.limit = +req.query.perPage || 10;
      findOptions.offset = (+req.query.page - 1) * findOptions.limit;
    }

    if (req.query.orderBy) {
      findOptions.order = [req.query.orderBy, req.query.orderType || 'DESC'];
    }
    if (req.query.patientId) {
      findOptions.where['$appointment.patient_id$'] = req.query.patientId;
    }
    if (req.query.appointmentId) {
      findOptions.where.appointmentId = req.query.appointmentId;
    }
    findOptions.include = ['appointment'];
    return await this.repository.find(findOptions);
  }
  async findOne(id) {
    return await this.repository.findOne(id, ['appointment']);
  }
};
