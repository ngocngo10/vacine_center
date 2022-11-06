const ErrorCreator = require('./error_createtor');

module.exports = class BaseRepository {
  constructor() {};

  async create(objData) {
    const newObject = await this.model.create(objData);
    await newObject.save();
    return newObject;
  }
  
  async find(findConditions = null, other = null) {
    const queryData = {}
    if (findConditions) {
      queryData.where = { ...findConditions }
    }
    const page = other?.page || 1;
    const offset = page * (page -1);
    queryData.offset = offset;
    if (other?.perPage) {
      queryData.limit = other.perPage
    }
    if (other?.orderBy) {
      queryData.order = [[other.orderBy, other.orderType ? other.orderType: 'DESC']];
    }
    
    const objects = await this.model.findAll({ ...queryData })
    return objects;
  }

  async findOne(findCondition) {
    const obj = await this.model.findOne({
      where: findCondition
    });
    return obj;
  }

  async update(findConditions, data) {
    const obj = await this.model.findOne({ where: {
      ...findConditions
    }});
    if (!obj) throw new ErrorCreator('Not found.', 404)
    Object.assign(obj, data);
    await obj.save();
    return;
  }

  async delete(id) {
    const obj = await this.model.findOne({ where: {
      id: +id
    }});
    if (!obj) throw new ErrorCreator('Not found.', 404)
    await obj.destroy();
    return;
  }
}