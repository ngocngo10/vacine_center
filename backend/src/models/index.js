const dbConfig = require("../../configs/db.config.js");

const Sequelize = require("sequelize");
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

User = require("./user.model.js")(sequelize, Sequelize);
Patient = require('./patient.model')(sequelize, Sequelize);
Appointment = require('./appointment.model')(sequelize, Sequelize);
Vaccine = require('./vaccine.model')(sequelize, Sequelize);
Category = require('./category.model')(sequelize, Sequelize);
VaccineCategory = require('./vaccine-category.model')(sequelize, Sequelize);
VaccineDetail = require('./vaccine-detail.model')(sequelize, Sequelize);

// define relations
Category.hasMany(VaccineCategory, { as: "vaccineCategories" });
VaccineCategory.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});
Vaccine.hasMany(VaccineCategory, { as: "vaccineCategories" });
VaccineCategory.belongsTo(Vaccine, {
  foreignKey: "vaccine_id",
  as: "vaccine",
});
Vaccine.belongsToMany(Category, { through: VaccineCategory, as: 'categories' });
Category.belongsToMany(Vaccine, { through: VaccineCategory, as: 'vaccines' });

Vaccine.hasMany(VaccineDetail, { as: "vaccineDetails" });
VaccineDetail.belongsTo(Vaccine, {
  foreignKey: "vaccine_id",
  as: "vaccine",
});

User.hasMany(Patient, { as: 'patients', foreignKey: 'representative'});
Patient.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'representative',
  as: 'representator'
});

module.exports = {
  Sequelize,
  sequelize,
  Vaccine,
  User,
  Patient,
  Appointment,
  Category,
  VaccineCategory,
  VaccineDetail,
};
