// const userController = require('./user.controller');
const AuthController = require('./auth.controller');
const CategoryController = require('./category.controller');
const VaccineController = require('./vaccine.controller');
const VaccineDetailController = require('./vaccine-detail.controller');
const PatientController = require('./patient.controller');
const ScheduleConfig = require('./schedule-config.controller');
const UploadController = require('./upload.controller');
const AgeGroupController = require('./age-group.controller');

module.exports = {
  AuthController,
  CategoryController,
  VaccineController,
  VaccineDetailController,
  PatientController,
  ScheduleConfig,
  UploadController,
  AgeGroupController
};
