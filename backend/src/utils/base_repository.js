const ErrorCreator = require('./error_createtor');

module.exports = class BaseRepository {
  constructor() {};

  async create(data) {
    return this.model.create(data);
  }
  
  async find(findOptions) {
    console.log(findOptions);
    return this.model.findAll(findOptions);
  }

  async findOne(id, relation = []) {
    console.log(id);
    return this.model.findByPk(id, { include: relation });
  }

  async update(id, data) {
    const instance = await this.model.findByPk(id);
    if (!instance) throw new ErrorCreator('Not Found', 404);
    Object.assign(instance, data);
    return await instance.save();
  }

  async delete(id) {
    const instance = await this.model.findByPk(id);
    if (!instance) throw new ErrorCreator('Not Found', 404);
    return await instance.destroy();
  }
}
