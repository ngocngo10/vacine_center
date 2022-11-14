const { PatientService } = require('../services');
const ErrorCreator = require('../utils/error_createtor');
const patientService = new PatientService();
async function create(req, res, next) {
  try {
    await patientService.create(req.body);
    return res.json({
      message: "Patient is created successfully",
    });
  } catch (error) {
    next(error);
  }
};

async function find(req, res, next) {
  try {
    const patients = await patientService.find(req.query);
    return res.json(patients);
  } catch (error) {
    next(error);
  }
};

async function findOne(req, res, next) {
  try {
    const patient = await patientService.findOne(req.params.id);
    return res.json({ patient });
  } catch (error) {
    next(error);
  }
};

async function update(req, res, next) {
  try {
    await patientService.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
};

async function deletePatient(req, res, next) {
  try {
    await patientService.deletePatient(req.params.id);
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
  deletePatient,
}
