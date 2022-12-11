const { InjectionService } = require('../services');
const ErrorCreator = require('../utils/error_creator');
const injectionService = new InjectionService();
async function create(req, res, next) {
  try {
    await injectionService.create(req.body);
    return res.json({
      message: 'Injection is created successfully'
    });
  } catch (error) {
    next(error);
  }
}

async function bulkCreate(req, res, next) {
  try {
    await injectionService.bulkCreate(req.body);
    return res.json({
      message: 'Injections are created successfully'
    });
  } catch (error) {
    next(error);
  }
}

async function find(req, res, next) {
  try {
    const injections = await injectionService.find(req.query);
    return res.json(injections);
  } catch (error) {
    next(error);
  }
}

async function findOne(req, res, next) {
  try {
    const injection = await injectionService.findOne(req.params.id);
    return res.json({ injection });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await injectionService.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
}

async function deleteInjection(req, res, next) {
  try {
    await injectionService.deleteInjection(req.params.id);
    return res.json({ message: 'Deleted.' });
  } catch (error) {
    next(error);
  }
}
async function deleteMulti(req, res, next) {
  try {
    await injectionService.deleteMulti(req.body.ids);
    return res.json({ message: 'Deleted.' });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  create,
  find,
  findOne,
  update,
  deleteInjection,
  deleteMulti,
  bulkCreate
};
