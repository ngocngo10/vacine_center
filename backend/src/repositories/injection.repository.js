const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const Injection = db.Injection;
const Op = db.Sequelize.Op;

module.exports = class InjectionRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Injection;
  }
};
