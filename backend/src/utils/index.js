const jwt = require('jsonwebtoken');

function generateLoginToken(userInfo) {
  const payload = {
    secret: process.env.SECRET_PAYLOAD,
    user: userInfo
  };
  const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
    expiresIn: '3d'
  });
  return token;
}

function generateRefreshToken(userInfo) {
  const payload = {
    secret: process.env.SECRET_REFRESH_PAYLOAD,
    user: userInfo
  };
  const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, {
    expiresIn: '90d'
  });
  return token;
}

module.exports = {
  generateLoginToken,
  generateRefreshToken
};
