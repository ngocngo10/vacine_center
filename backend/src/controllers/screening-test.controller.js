const { ScreeningTestService } = require('../services');
const ErrorCreator = require('../utils/error_creator');
const service = new ScreeningTestService();
async function create(req, res, next) {
  try {
    await service.create(req.body);
    return res.json({
      message: 'Created successfully'
    });
  } catch (error) {
    next(error);
  }
}

async function find(req, res, next) {
  try {
    const screeningTests = await service.find(req);
    return res.json(screeningTests);
  } catch (error) {
    next(error);
  }
}

async function findOne(req, res, next) {
  try {
    const screeningTest = await service.findOne(req.params.id);
    return res.json({ screeningTests });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await service.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  find,
  findOne,
  update
};
