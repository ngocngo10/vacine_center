const { UserRepository } = require('../repositories');
const { Op } = require('sequelize');
const ErrorCreator = require('../utils/error_creator');

module.exports = class AdminService {
  constructor() {
    this.repository = new UserRepository();
  }
  async blockUser(id) {
    await this.repository.update(id, { isBlocked: true });
  }

  async unblockUser(id) {
    await this.repository.update(id, { isBlocked: false });
  }

  async unblockMultiUser(ids) {
    await this.repository.model.update({ where: { id: ids }}, { isBlocked: false });
  }
 
  async blockMultiUser(ids) {
    await this.repository.model.update({ where: { id: ids } }, { isBlocked: true });
  }
};
