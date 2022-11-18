// const userController = require('./user.controller');
const AuthController = require('./auth.controller');
const CategoryController = require('./category.controller');
const VaccineController = require('./vaccine.controller');
const VaccineDetailControler = require('./vaccine-detail.controller');
const PatientController = require('./patient.controller');
const ScheduleConfig = require('./schedule-config.controller');

module.exports = {
  AuthController,
  CategoryController,
  VaccineController,
  VaccineDetailControler,
  PatientController,
  ScheduleConfig
};
