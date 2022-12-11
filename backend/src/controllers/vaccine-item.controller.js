const { VaccineItemService } = require('../services');
const ErrorCreator = require('../utils/error_creator');
const service = new VaccineItemService();
async function create(req, res, next) {
  try {
    await service.create(req.body);
    return res.json({
      message: 'Vaccine Item is created successfully'
    });
  } catch (error) {
    next(error.statusCode ? error : new ErrorCreator(error.message, 500));
  }
}

async function find(req, res, next) {
  try {
    const vaccineItems = await service.find(req.query);
    return res.json(vaccineItems);
  } catch (error) {
    next(error);
  }
}

async function findOne(req, res, next) {
  try {
    const vaccineItem = await service.findOne(req.params.id);
    return res.json({ vaccineItem });
  } catch (error) {
    next(error);
  }
}

async function deleteSingle(req, res, next) {
  try {
    await service.deleteVaccineItem(req.params.id);
    return res.json({ message: 'Deleted.' });
  } catch (error) {
    next(error);
  }
}

async function deleteMulti(req, res, next) {
  try {
    await service.deleteMulti(req.body.ids);
    return res.json({ message: 'Deleted.' });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  create,
  find,
  findOne,
  deleteSingle,
  deleteMulti
};
