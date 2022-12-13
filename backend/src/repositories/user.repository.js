const db = require('../models');
const Op = db.Sequelize.Op;
const BaseRepository = require('../utils/base_repository');

module.exports = class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.model = db.User;
  }

  async createUser(userInfo) {
    const newUser = await this.model.create(userInfo);
    await newUser.save();
    return newUser;
  }

  async findUserByPhoneNumber(phoneNumber) {
    const user = await this.model.findOne({
      where: { phoneNumber }
    });
    return user;
  }
  async findAllUsers(findCondition) {
    const users = await this.model.findAll({
      where: findCondition
    });
    return users;
  }
  async findUser(findCondition) {
    const users = await this.model.findOne({
      where: {
        ...findCondition
      }
    });
    return users;
  }
  async update(id, data) {
    const user = await this.model.findOne({
      where: {
        id: id
      }
    });
    Object.assign(user, data);
    await user.save();
    return;
  }
};
