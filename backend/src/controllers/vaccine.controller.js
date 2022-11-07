const { VaccineService } = require('../services');
const vaccineService = new VaccineService();
async function create(req, res, next) {
  try {
    await vaccineService.create(req.body);
    return res.json({
      message: "Vaccine is created successfully",
    });
  } catch (error) {
    next(error);
  }
};

async function find(req, res, next) {
  try {
    const vaccinces = await vaccineService.find(req.query);
    return res.json({ vaccinces });
  } catch (error) {
    next(error);
  }
};

async function findOne(req, res, next) {
  try {
    const vaccine = await vaccineService.findOne(req.params.id);
    return res.json({ vaccine });
  } catch (error) {
    next(error);
  }
};

async function update(req, res, next) {
  try {
    await vaccineService.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
};

async function deleteVaccine(req, res, next) {
  try {
    await vaccineService.deleteCategory(req.params.id);
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
  // deleteCategory
}
