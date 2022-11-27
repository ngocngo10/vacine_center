const { VaccineRepository } = require('../repositories');
const { sequelize } = require('../models');
const ErrorCreator = require('../utils/error_creator');
const { Op } = require('sequelize');

module.exports = class VaccineService {
  constructor() {
    this.repository = new VaccineRepository();
  }
  async create(bodyRequest) {
    try {
      this.repository.create(bodyRequest);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async update(id, body) {
    const findCondition = { id };
    const updateData = {
      ...body
    };
    try {
      await this.repository.update(findCondition, updateData);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async find(reqQuery) {
    try {
      let findOptions = {};
      if (reqQuery.name) {
        findOptions.where = {
          name: {
            [Op.iLike]: `%${reqQuery.name}%`
          }
        };
      }

      if (reqQuery.categoryId) {
        findOptions.include = [
          {
            model: VaccineCategory,
            as: 'vaccineCategories',
            where: { categoryId: reqQuery.categoryId }
          }
        ];
      }

      const page = reqQuery.page || 1;
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (page - 1) * findOptions.limit;

      if (reqQuery.orderBy) {
        findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
      }
      findOptions.include = ['category'];

      const vaccines = await this.repository.find(findOptions);
      return vaccines;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async findOne(id) {
    try {
      const vaccine = await this.repository.findOne(id, ['categories', 'vaccineDetails']);
      return vaccine;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async deleteVaccine(id) {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }
};
