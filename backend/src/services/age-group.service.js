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

  async find() {
    return await this.repository.find();
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
      return res.json({ message: 'Deleted.' });
    } catch (error) {
      next(error);
    }
  }
};
