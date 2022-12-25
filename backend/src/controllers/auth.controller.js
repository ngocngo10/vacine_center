const { AuthService } = require('../services');
const authService = new AuthService();
async function register(req, res, next) {
  try {
    const tokens = await authService.register(req.body);
    res.json({
      message: 'Account is created successfully',
      ...tokens
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const tokens = await authService.login(req.body);
    res.json({ ...tokens });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const token = await authService.refreshToken(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const token = await authService.logout(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    await authService.changePassword(req.body);
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    await authService.forgotPassword(req.body);
    res.json({ message: 'Please check mail to reset your password' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout,
  refreshToken,
  register,
  forgotPassword,
  changePassword
};
