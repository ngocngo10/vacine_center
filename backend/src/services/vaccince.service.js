const {
  VaccineRepository,
  AgeGroupVaccineRepository,
  AgeGroupRepository
} = require('../repositories');
const { sequelize, AgeGroup } = require('../models');
const ErrorCreator = require('../utils/error_creator');
const { Op } = require('sequelize');

module.exports = class VaccineService {
  constructor() {
    this.repository = new VaccineRepository();
    this.ageGroupRepo = new AgeGroupRepository();
    this.ageGroupVaccineRepo = new AgeGroupVaccineRepository();
  }
  async create(bodyRequest) {
    try {
      const { ageGroupIds, ...data } = bodyRequest;
      console.log(data);
      const vaccine = await this.repository.create(data);

      if (ageGroupIds?.length) {
        const arr = ageGroupIds.map((item) => ({
          vaccineId: vaccine.id,
          ageGroupId: item
        }));
        await this.ageGroupVaccineRepo.model.bulkCreate(arr);
      }
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

      const page = reqQuery.page || 1;
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (page - 1) * findOptions.limit;

      if (reqQuery.orderBy) {
        findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
      }
      if (reqQuery.categoryGroup === 'AGE' && reqQuery.categoryId) {
        findOptions.where = { ageGroupId: reqQuery.categoryId };
        findOptions.include = ['ageGroup', 'vaccine'];
        const data = await this.ageGroupVaccineRepo.find(findOptions);
        const vaccines = data.rows.map((item) => item.vaccine);
        data.rows = vaccines;
        return data;
      } else {
        if (reqQuery.categoryId) findOptions.where = { categoryId: reqQuery.categoryId };
        const data = await this.repository.find(findOptions);
        return data;
      }
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async findOne(id) {
    try {
      const vaccine = await this.repository.findOne(id, [
        'category',
        'vaccineDetails',
        'ageGroups'
      ]);
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
