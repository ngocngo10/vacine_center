const { AgeGroupService } = require('../services');
const ErrorCreator = require('../utils/error_creator');
const ageGroupService = new AgeGroupService();
async function create(req, res, next) {
  try {
    await ageGroupService.create(req.body);
    return res.json({
      message: 'Age group is created successfully'
    });
  } catch (error) {
    next(error);
  }
}

async function find(req, res, next) {
  try {
    const ageGroups = await ageGroupService.find(req.query);
    return res.json(ageGroups);
  } catch (error) {
    next(error);
  }
}

async function findOne(req, res, next) {
  try {
    const ageGroup = await ageGroupService.findOne(req.params.id);
    return res.json({ ageGroup });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await ageGroupService.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
}

async function deleteAgeGroup(req, res, next) {
  try {
    await ageGroupService.deleteCategory(req.params.id);
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
  deleteAgeGroup
};
