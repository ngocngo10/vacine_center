const UserRepository = require('./user.repository');
const CategoryRepository = require('./category.repository');
const VaccineRepository = require('./vaccine.repository');
const VaccineDetailRepository = require('./vaccine-detail.repository');
const PatientRepository = require('./patient.repository');
const ScheduleConfigRepository = require('./schedule-config.repository');
const AgeGroupRepository = require('./age-group.repository');
const AgeGroupVaccineRepository = require('./age-group-vaccine.repository');

module.exports = {
  UserRepository,
  CategoryRepository,
  VaccineRepository,
  VaccineDetailRepository,
  PatientRepository,
  ScheduleConfigRepository,
  AgeGroupRepository,
  AgeGroupVaccineRepository
};
