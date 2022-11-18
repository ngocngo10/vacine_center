const jwt = require('jsonwebtoken');
const ErrorCreator = require('../utils/error_creator');
const constants = require('../constants');
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';
const SECRET_PAYLOAD = process.env.SECRET_PAYLOAD || '';
const { User } = require('../models/index');

async function validateToken(req, res, next) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);
    if (decoded.user.email && decoded.secret === SECRET_PAYLOAD) {
      req.user = {
        ...decoded.user
      };
      return next();
    }

    next(new ErrorCreator(constants.INVALID_TOKEN, 401));
  } catch (error) {
    console.log(error);
    if (error.name === constants.TOKEN_EXPIRED_ERROR) {
      next(new ErrorCreator(constants.TOKEN_EXPIRED_ERROR, 401));
    }

    next(new ErrorCreator(constants.INVALID_TOKEN, 401));
  }
}

async function isAdmin(req, res, next) {
  const user = await User.findByPk(req.user.id);
  console.log(user);
  if (!user || !user.roles.includes('admin')) {
    next(new ErrorCreator('Permission deny.', 403));
  }
  next();
}

module.exports = {
  validateToken,
  isAdmin
};
