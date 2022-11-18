const jwt = require('jsonwebtoken');

function generateLoginToken(userInfo) {
  const payload = {
    secrect: process.env.SECRET_PAYLOAD,
    user: userInfo
  };
  const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
    expiresIn: '1h'
  });
  return token;
}

function generateRefreshToken(userInfo) {
  const payload = {
    secrect: process.env.SECRET_REFRESH_PAYLOAD,
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
