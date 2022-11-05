const jwt = require('jsonwebtoken');
const ErrorCreator = require('../utils/error_createtor');
const constants = require('../constants');
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || '';
const SECRET_PAYLOAD = process.env.SECRET_PAYLOAD || '';

async function validateToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);
    if (decoded.email && decoded.secrect === SECRET_PAYLOAD) {
      req.user = {
        ...decoded
      };
      next();
    }

    throw new ErrorCreator(constants.INVALID_AUTH_TOKEN, 401);
  } catch (error) {
    if (error.name === constants.TOKEN_EXPIRED_ERROR) {
      throw new ErrorCreator(constants.TOKEN_EXPIRED_ERROR, 401);
    }

    throw new ErrorCreator(constants.INVALID_AUTH_TOKEN, 401);
  }
}

module.exports = {
  validateToken
};
