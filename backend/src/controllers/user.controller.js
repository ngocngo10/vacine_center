const { userService } = require('../services');
async function register(req, res, next) {
  try {
    await userService.createUser(req.body);
    res.json({
      message: "created",
    });
  } catch (error) {
    next(error);
  }
};

async function listUsers(req, res, next) {
  try {
    const users = await userService.listUsers(req.query);
    res.json({ users });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  register,
  listUsers
};
