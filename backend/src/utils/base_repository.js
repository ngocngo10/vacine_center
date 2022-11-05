export class BaseRepository {
  constructor() {}

  async update(id, dataObj) {
    await this.model.update(id, dataObj);
  }
  async find(findOptions) {
    return await this.model.findAll({
      where: dataObj
    })
  }
}