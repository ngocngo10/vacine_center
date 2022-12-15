const { UserRepository } = require('../repositories');
const ErrorCreator = require('../utils/error_creator');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
module.exports = class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  async createUser(requestBody) {
    const rawPassword = requestBody.password;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(rawPassword, salt);
    const userInfo = {
      ...requestBody,
      password
    };

    const isExistedEmail = await this.checkEmailExisted(userInfo.email);
    if (isExistedEmail) {
      throw new ErrorCreator('Email is existed', 400);
    }
    const newUser = await this.repository.create(userInfo);
    return newUser;
  }

  async find(reqQuery) {
    try {
      let findOptions = { where: {} };
      if (reqQuery.name) {
        findOptions.where.name = {
          [Op.iLike]: `%${reqQuery.name}%`
        };
      }
      findOptions.attributes = { exclude: ['password', 'refreshToken', 'forgotPasswordToken'] };

      if (reqQuery.email) {
        findOptions.where.email = reqQuery.email;
      }

      if (reqQuery.phoneNumber) {
        findOptions.where.phoneNumber = reqQuery.phoneNumber;
      }

      if (reqQuery.isBLocked) {
        findOptions.where.isBLocked = true;
      }

      const page = reqQuery.page || 1;
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (page - 1) * findOptions.limit;

      if (reqQuery.orderBy) {
        findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
      }
      findOptions.include = ['patients'];
      const data = await this.repository.find(findOptions);
      return data;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async findOne(id) {
    try {
      const data = await this.repository.findOne(id, ['patients']);
      data.setDataValue('password', undefined);
      data.setDataValue('forgotPasswordToken', undefined);
      data.setDataValue('refreshToken', undefined);

      return data;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async checkUserExisted(phoneNumber) {
    return this.repository.findUserByPhoneNumber(phoneNumber);
  }

  async checkEmailExisted(email) {
    return await this.repository.model.findOne({
      where: {
        email: email
      }
    });
  }

  async update(id, body) {
    try {
      if (body.password) {
        const rawPassword = body.password;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(rawPassword, salt);
      }

      await this.repository.update(id, body);
      return;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async deleteMulti(ids) {
    try {
      await this.repository.model.destroy({
        where: {
          id: ids
        }
      });
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }
};
