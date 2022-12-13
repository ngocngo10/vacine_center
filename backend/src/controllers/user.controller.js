const { UserService } = require('../services');
const service = new UserService();
async function register(req, res, next) {
  try {
    await service.createUser(req.body);
    res.json({
      message: 'created'
    });
  } catch (error) {
    next(error);
  }
}

async function find(req, res, next) {
  try {
    const users = await service.find(req.query);
    res.json({ users });
  } catch (error) {
    next(error);
  }
}

async function findOne(req, res, next) {
  try {
    const user = await service.findOne(req.params.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}
async function update(req, res, next) {
  try {
    await service.update(req.params.id, req.body);
    res.json({ message: 'updated.' });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    await service.delete(req.params.id);
    res.json({ message: 'delete.' });
  } catch (error) {
    next(error);
  }
}

async function deleteMulti(req, res, next) {
  try {
    await service.deleteMulti(req.body.ids);
    res.json({ message: 'deleted.' });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  register,
  find,
  findOne,
  update,
  deleteUser,
  deleteMulti
};
