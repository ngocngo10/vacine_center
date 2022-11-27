const {
  VaccineDetailRepository,
  VaccineRepository: VaccineRepository
} = require('../repositories');

module.exports = class VaccineDetailService {
  constructor() {
    this.vaccineRepository = new VaccineRepository();
    this.repository = new VaccineDetailRepository();
  }
  async create(data) {
    await this.repository.create(data);
    return;
  }

  async update(id, body) {
    const updateData = {
      ...body
    };
    const vaccineDetail = this.repository.findOne(id);
    if (!vaccineDetail) throw new ErrorCreator('Not found', 404);
    await this.repository.update(id, updateData);
    return;
  }

  async find(reqQuery) {
    const findOptions = {};
    let vaccine;
    const result = {};
    if (reqQuery.vaccineId) {
      findOptions.where = {
        vaccineId: reqQuery.vaccineId
      };
      vaccine = await this.vaccineRepository.findOne(reqQuery.vaccineId, ['categories']);
      result.vaccine = vaccine;
    }
    findOptions.order = [['id', 'ASC']];
    const vaccineDetails = await this.repository.model.findAll(findOptions);
    result.vaccineDetails = vaccineDetails;

    return result;
  }

  async findOne(id) {
    return await this.repository.findOne(id, ['vaccine']);
  }

  async deleteVaccineDetail(id) {
    const vaccineDetail = this.repository.findOne(id);
    if (!vaccineDetail) throw new ErrorCreator('Not found', 404);
    return await this.repository.delete(id);
  }
};
