const { Op } = require('sequelize');
const { PatientRepository } = require('../repositories');

module.exports = class PatientService {
  constructor() {
    this.repository = new PatientRepository();
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

  async find(reqQuery, userId = 0) {
    const findOptions = {
      where: {
        '$appointments.check_in_at$': {
          [Op.not]: null
        }
      },
      include: ['representator', 'appointments']
    };
    if (reqQuery.representative) {
      findOptions.where.representative = reqQuery.representative;
    }
    reqQuery.patientName &&
      (findOptions.where.patientName = {
        [Op.like]: `%${reqQuery.patientName}%`
      });
    if (reqQuery.page) {
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }

    if (reqQuery.orderBy) {
      findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
    }
    if (reqQuery.patientCode) {
      findOptions.where.patientCode = reqQuery.patientCode;
    }
    if (userId) {
      findOptions.where.representative = userId;
    }
    return await this.repository.find(findOptions);
  }

  async findOne(id) {
    return await this.repository.findOne(id, ['representator', 'appointments']);
  }

  async deletePatient(id) {
    return await this.repository.delete(id);
  }
};
