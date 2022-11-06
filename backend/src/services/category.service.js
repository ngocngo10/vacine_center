const { CategoryRepository } = require('../repositories');

module.exports = class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
  }
  async create(data) {
    return this.repository.create(data);
  }

  async update(id, body) {
    const findCondition = { id };
    const updateData = {
      ...body
    }
    return this.repository.update(findCondition, updateData);
  }

  async find(reqQuery) {
    const findConditions = {};
    if (reqQuery.division) {
      findConditions.division = reqQuery.division;
    }

    const other = {};
    if (reqQuery.page) {
      other.page = +reqQuery.page;
    }
    if (reqQuery.perPage) {
      other.perPage = +reqQuery.perPage;
    }
    if (reqQuery.orderBy) {
      other.orderBy = reqQuery.orderBy;
    }
    if (reqQuery.orderType) {
      other.orderType = reqQuery.orderType;
    }
    return this.repository.find(
      Object.keys(findConditions).length ? findConditions : null,
      Object.keys(other).length ? other : null);
  }

  async findOne(id) {
    return this.repository.findOne({ id })
  }

  async deleteCategory(id) {
    return this.repository.delete(id);
  }
}
