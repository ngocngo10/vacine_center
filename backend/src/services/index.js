const UserService = require('./user.service');
const AuthService = require('./auth.service');
const CategoryService = require('./category.service');
const VaccineService = require('./vaccince.service');
const VaccineDetailService = require('./vaccine-detail.service');
const PatientService = require('./patient.service');
const ScheduleConfigService = require('./schedule-config.service');

module.exports = {
  UserService,
  AuthService,
  CategoryService,
  VaccineService,
  VaccineDetailService,
  PatientService,
  ScheduleConfigService
};
