const dbConfig = require('../../configs/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

User = require('./user.model.js')(sequelize, Sequelize);
Patient = require('./patient.model')(sequelize, Sequelize);
Appointment = require('./appointment.model')(sequelize, Sequelize);
Vaccine = require('./vaccine.model')(sequelize, Sequelize);
Category = require('./category.model')(sequelize, Sequelize);
AgeGroup = require('./age-group.model')(sequelize, Sequelize);
VaccineDetail = require('./vaccine-detail.model')(sequelize, Sequelize);
AgeGroupVaccine = require('./age-group-vaccine.model')(sequelize, Sequelize);
ScheduleConfig = require('./schedule-config.model')(sequelize, Sequelize);
Schedule = require('./schedule.model')(sequelize, Sequelize);
Injection = require('./injection.model')(sequelize, Sequelize);
ScreeningTest = require('./screening-test.model')(sequelize, Sequelize);
VaccineItem = require('./vaccine-item.model')(sequelize, Sequelize);

// define relations
Category.hasMany(Vaccine, { as: 'vaccines' });
Vaccine.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

AgeGroup.hasMany(AgeGroupVaccine, { as: 'ageGroupVaccines' });
AgeGroupVaccine.belongsTo(AgeGroup, {
  foreignKey: 'age_group_id',
  as: 'ageGroup'
});

Vaccine.hasMany(AgeGroupVaccine, { as: 'ageGroupVaccines' });
AgeGroupVaccine.belongsTo(Vaccine, {
  foreignKey: 'vaccine_id',
  as: 'vaccine'
});

AgeGroup.belongsToMany(Vaccine, { as: 'vaccines', through: AgeGroupVaccine, uniqueKey: 'vaccine_age_group_unique' });
Vaccine.belongsToMany(AgeGroup, { as: 'ageGroups', through: AgeGroupVaccine });

Vaccine.hasMany(VaccineDetail, { as: 'vaccineDetails' });
VaccineDetail.belongsTo(Vaccine, {
  foreignKey: 'vaccine_id',
  as: 'vaccine'
});

User.hasMany(Patient, { as: 'patients', foreignKey: 'representative' });
Patient.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'representative',
  as: 'representator'
});
Schedule.hasMany(Appointment, { as: 'appointments' });
Appointment.belongsTo(Schedule, {
  foreignKey: 'schedule_id',
  as: 'schedule'
});

User.hasMany(Appointment, { as: 'appointments' });
Appointment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Patient.hasMany(Appointment, { as: 'appointments' });
Appointment.belongsTo(Patient, {
  foreignKey: 'patient_id',
  as: 'patient'
});

Appointment.hasMany(Injection, { as: 'injections' });
Injection.belongsTo(Appointment, {
  foreignKey: 'appointment_id',
  as: 'appointment'
});

Vaccine.hasMany(Injection, { as: 'injections' });
Injection.belongsTo(Vaccine, {
  foreignKey: 'vaccine_id',
  as: 'vaccine'
});
// Appointment.belongsToMany(Vaccine, {
//   through: Injection,
//   as: 'injectionVaccines',
//   uniqueKey: 'appointment_vaccine_unique'
// });

VaccineItem.hasMany(Injection, { as: 'injections' });
Injection.belongsTo(VaccineItem, {
  foreignKey: 'vaccine_item_id',
  as: 'vaccineItem'
});

Vaccine.hasMany(VaccineItem, {
  as: 'vaccineItems',
  sourceKey: 'vaccineCode'
});
VaccineItem.belongsTo(Vaccine, {
  foreignKey: 'vaccine_code',
  as: 'vaccine',
  targetKey: 'vaccineCode'
});

Injection.afterCreate(async (injection, options) => {
  const vaccine = await Vaccine.findOne(injection.vaccineId);
  vaccine.quantity = vaccine.quantity - 1;
  await vaccine.save();
  const vaccineItem = await VaccineItem.findOne(injection.vaccineItemId);
  vaccineItem.quantity = vaccineItem.quantity - 1;
  await vaccineItem.save();
});


Appointment.hasOne(ScreeningTest, { as: 'screeningTest' });
ScreeningTest.belongsTo(Appointment, {
  foreignKey: 'appointment_id',
  as: 'appointment'
});

module.exports = {
  Sequelize,
  sequelize,
  Vaccine,
  User,
  Patient,
  Appointment,
  Category,
  AgeGroup,
  VaccineDetail,
  Appointment,
  AgeGroupVaccine,
  Schedule,
  ScheduleConfig,
  Injection,
  ScreeningTest,
  VaccineItem
};
