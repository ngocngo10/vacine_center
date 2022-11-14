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
    }
    await this.repository.update(id, updateData);
    return;
  }

  async find(reqQuery) {
    const findOptions = {};
    if (reqQuery.representative) {
      findOptions.where = {
        representative: reqQuery.representative,
      }
    }
    if (reqQuery.page) {
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }

    if (reqQuery.orderBy) {
      findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC']
    }
    return await this.repository.find(findOptions)
  }

  async findOne(id) {
    return await this.repository.findOne(id)
  }

  async deletePatient(id) {
    return await this.repository.delete(id);
  }
}
