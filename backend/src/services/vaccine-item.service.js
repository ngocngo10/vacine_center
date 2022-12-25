const { VaccineItemRepository } = require('../repositories');
const { sequelize } = require('../models');
const ErrorCreator = require('../utils/error_creator');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

module.exports = class VaccineItemService {
  constructor() {
    this.repository = new VaccineItemRepository();
  }
  async create(bodyRequest) {
    const t = await sequelize.transaction();
    try {
      const { vaccineItems } = bodyRequest;
      await this.repository.model.bulkCreate(vaccineItems);
      await t.commit();
      return;
    } catch (error) {
      await t.rollback();
      throw new ErrorCreator(error.message, 500);
    }
  }

  async find(reqQuery) {
    try {
      let findOptions = { where: {} };
      if (reqQuery.vaccineId) {
        findOptions.where['$vaccine.id$'] = reqQuery.vaccineId;
      }

      if (reqQuery.vaccineName) {
        findOptions.where['$vaccine.name$'] = {
          [Op.like]: `%${reqQuery.vaccineName}%`
        };
      }

      if (reqQuery.vaccineCode) {
        findOptions.where.vaccineCode = reqQuery.vaccineCode;
      }

      if (reqQuery.isExpired) {
        findOptions.where.expirationDate = {
          [Op.lt]: moment().format('YYYY-MM-DD')
        }
      }

      if (reqQuery.expiredDay) {
        findOptions.where.expirationDate = {
          [Op.lt]: moment().add(+reqQuery.expiredDay, 'days').format('YYYY-MM-DD')
        }
      }

      if (reqQuery.isAvailable) {
        findOptions.where.quantity = {
          [Op.gt]: 0
        };
      }

      if (reqQuery.isAvailable === false) {
        findOptions.where.quantity = {
          [Op.eq]: 0
        };
      }

      const page = reqQuery.page || 1;
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (page - 1) * findOptions.limit;

      if (reqQuery.orderBy) {
        findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
      }
      findOptions.include = ['vaccine'];
      return await this.repository.find(findOptions);
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async findOne(id) {
    try {
      const vaccine = await this.repository.findOne(id, ['vaccine']);
      return vaccine;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async deleteVaccineItem(id) {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async deleteMulti(ids) {
    try {
      await this.repository.model.destroy({
        where: {
          id: [ids]
        }
      });
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }
};
