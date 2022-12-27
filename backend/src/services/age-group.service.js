const { Op } = require('sequelize');
const { AgeGroupRepository } = require('../repositories');

module.exports = class AgeGroupService {
  constructor() {
    this.repository = new AgeGroupRepository();
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

  async find(reqQuery) {
    const findOptions = {};
    if (reqQuery.page) {
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }

    if (reqQuery.orderBy) {
      findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
    }
    if (reqQuery.name) {
      findOptions.where = {
        name: {
          [Op.iLike]: `%${reqQuery.name}%`
        }
      };
    }
    return await this.repository.find(findOptions);
  }

  async findOne(id) {
    return await this.repository.findOne(id);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async deleteMulti(ids) {
    try {
      await this.repository.deleteMulti(ids);
      return;
    } catch (error) {
      throw error;
    }
  }
};
