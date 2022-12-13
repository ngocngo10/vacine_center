const { InjectionRepository, VaccineRepository, VaccineItemRepository } = require('../repositories');
const moment = require('moment-timezone');
const { Op } = require('sequelize');
module.exports = class InjectionService {
  constructor() {
    this.repository = new InjectionRepository();
    this.vaccineRepo = new VaccineRepository();
    this.vaccineItemRepo = new VaccineItemRepository
  }
  async create(data) {
    await this.repository.create(data);
    return;
  }
  async bulkCreate(data) {
    const today = moment().format('YYYY-MM-DD');
    await Promise.all(data.injections.map(async (item) => {
      const vaccine = await this.vaccineRepo.model.findOne({ where: { id: item.vaccineId } });
      const vaccineItems = await this.vaccineItemRepo.model.findAll({
        where: {
          quantity: {
            [Op.gt]: 0,
          },
          vaccineCode: vaccine.vaccineCode,
          expirationDate: {
            [Op.gt]: today
          }
        },
        order: [['expirationDate', 'ASC']]
      });
      await this.repository.model.create({ ...item, vaccineItemId: vaccineItems[0].id })
    }));
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
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }

    if (reqQuery.orderBy) {
      findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
    }
    findOptions.include = ['vaccine', 'appointment'];
    return await this.repository.find(findOptions);
  }

  async findOne(id) {
    return await this.repository.findOne(id);
  }

  async deleteInjection(id) {
    return await this.repository.delete(id);
  }

  async deleteMulti(ids) {
    return await this.repository.deleteMulti(ids);
  }
};
