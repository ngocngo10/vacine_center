const { CategoryService } = require('../services');
const ErrorCreator = require('../utils/error_creator');
const categoryService = new CategoryService();
async function create(req, res, next) {
  try {
    await categoryService.create(req.body);
    return res.json({
      message: 'Category is created successfully'
    });
  } catch (error) {
    next(error);
  }
}

async function find(req, res, next) {
  try {
    const categories = await categoryService.find(req.query);
    return res.json(categories);
  } catch (error) {
    next(error);
  }
}

async function findOne(req, res, next) {
  try {
    const category = await categoryService.findOne(req.params.id);
    return res.json({ category });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await categoryService.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await categoryService.deleteCategory(req.params.id);
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
  deleteCategory
};
