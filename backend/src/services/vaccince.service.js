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
    const { ageGroupIds, ...updateData } = body;
    try {
      await this.ageGroupVaccineRepo.model.destroy({
        where: {
          vaccineId: +id
        },
        force: true
      });
      const newsAgeGroupVaccines = ageGroupIds.map((item) => ({
        ageGroupId: item,
        vaccineId: +id
      }));
      await this.ageGroupVaccineRepo.model.bulkCreate(newsAgeGroupVaccines);
      await this.repository.update(id, updateData);
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

  async deleteMulti(vaccineIds) {
    try {
      await this.repository.model.destroy({
        where: {
          id: [vaccineIds]
        }
      });
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }
};
