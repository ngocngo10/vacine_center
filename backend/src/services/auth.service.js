const { UserRepository } = require('../repositories');
const { Op } = require('sequelize');
const ErrorCreator = require('../utils/error_creator');
const constants = require('../constants');
const { generateLoginToken, generateRefreshToken } = require('../utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class AuthService {
  constructor() {
    this.repository = new UserRepository();
  }
  async register(requestBody) {
    const rawPassword = requestBody.password;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(rawPassword, salt);
    const userInfo = {
      ...requestBody,
      password,
      roles: requestBody.roles || ['user']
    };
    const isExist = await this.checkUserExisted(userInfo.phoneNumber);
    if (isExist) {
      throw new ErrorCreator(constants.USER_EXISTED, 400);
    }
    const isExistedEmail = await this.checkEmailExisted(userInfo.email);
    if (isExistedEmail) {
      throw new ErrorCreator('Email is existed', 400);
    }

    const newUser = await this.repository.createUser(userInfo);
    const token = generateLoginToken({
      id: newUser.id,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber
    });
    const refreshToken = generateRefreshToken({
      id: newUser.id,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber
    });
    newUser.refreshToken = refreshToken;
    await newUser.save();
    return {
      token,
      refreshToken,
      user: {
        name: newUser.name,
        roles: newUser.roles,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber
      }
    };
  }

  async login(requestBody) {
    const { phoneNumber, password } = requestBody;
    const user = await this.repository.model.findOne({
      where: {
        [Op.or]: [{ phoneNumber: phoneNumber }, { email: phoneNumber }]
      }
    });
    if (!user) {
      throw new ErrorCreator(constants.INVALID_PHONE_OR_PASSWORD, 400);
    }
    if (user.isBlocked) {
      throw new ErrorCreator('User is blocked', 400);
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (isCorrectPassword) {
      const token = generateLoginToken({
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber
      });
      const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber
      });
      await this.repository.update(user.id, { refreshToken: refreshToken });
      return {
        token,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          roles: user.roles,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      };
    }

    throw new ErrorCreator(constants.INVALID_PHONE_OR_PASSWORD, 400);
  }

  async refreshToken(requestBody) {
    const { refreshToken } = requestBody;
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_KEY);
      if (decoded.email && decoded.secret === process.env.SECRET_REFRESH_PAYLOAD) {
        const user = await this.repository.findUser({ refreshToken });
        if (user?.refreshToken === refreshToken) {
          return generateLoginToken();
        }
      }
      throw new ErrorCreator(constants.INVALID_REFRESH_TOKEN, 400);
    } catch (error) {
      if (error.name === constants.TOKEN_EXPIRED_ERROR) {
        throw new ErrorCreator(constants.LOGIN_AGAIN, 401);
      }

      throw new ErrorCreator(constants.INVALID_REFRESH_TOKEN, 401);
    }
  }

  async logout(userId) {
    try {
      if (decoded.email && decoded.secret === process.env.SECRET_REFRESH_PAYLOAD) {
        const user = await this.repository.findUser({ id: userId });
        await this.repository.update(user.id, { refreshToken: '' });
        return;
      }
      throw new ErrorCreator(constants.INVALID_REFRESH_TOKEN, 400);
    } catch (error) {
      if (error.name === constants.TOKEN_EXPIRED_ERROR) {
        throw new ErrorCreator(constants.LOGIN_AGAIN, 401);
      }

      throw new ErrorCreator(constants.INVALID_REFRESH_TOKEN, 401);
    }
  }
  async checkUserExisted(phoneNumber) {
    return await this.repository.findUser({ phoneNumber });
  }
  async checkEmailExisted(email) {
    return await this.repository.model.findOne({
      where: {
        email: email
      }
    });
  }
};
