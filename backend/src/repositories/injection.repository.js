const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const Injection = db.Injection;
const Op = db.Sequelize.Op;

module.exports = class InjectionRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Injection;
    this.sequelize = db.sequelize;
  }

  async bulkCreate(data) {
    const t = await this.sequelize.transaction();
    try {
      await this.model.bulkCreate(data);
      await t.commit();
      return;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};
