const { CategoryRepository, AgeGroupRepository } = require('../repositories');

module.exports = class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
    this.ageGroupRepository = new AgeGroupRepository();
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
    if (reqQuery.categoryGroup === 'AGE') {
      return await this.ageGroupRepository.find(findOptions);
    }
    return await this.repository.find(findOptions);
  }

  async findOne(id) {
    return await this.repository.findOne(id);
  }

  async deleteCategory(id) {
    return await this.repository.delete(id);
  }

  async deleteMulti(ids) {
    return await this.repository.deleteMulti(ids)
  }
};
