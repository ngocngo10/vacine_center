const { VaccineDetailService } = require('../services');
const ErrorCreator = require('../utils/error_createtor');
const vaccineDetailService = new VaccineDetailService();
async function create(req, res, next) {
  try {
    await vaccineDetailService.create(req.body);
    return res.json({
      message: "Vaccine detail is created successfully",
    });
  } catch (error) {
    next(error);
  }
};

async function find(req, res, next) {
  try {
    const vaccineDetails = await vaccineDetailService.find(req.query);
    return res.json(vaccineDetails);
  } catch (error) {
    next(error);
  }
};

async function findOne(req, res, next) {
  try {
    const vaccineDetail = await vaccineDetailService.findOne(req.params.id);
    if (!vaccineDetail) throw new ErrorCreator('Not found', 404);
    return res.json(vaccineDetail);
  } catch (error) {
    next(error);
  }
};

async function update(req, res, next) {
  try {
    await vaccineDetailService.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
};

async function deleteVaccineDetail(req, res, next) {
  try {
    await vaccineDetailService.deleteVaccineDetail(req.params.id);
    return res.json({ message: 'Deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  find,
  findOne,
  update,
  deleteVaccineDetail
}
