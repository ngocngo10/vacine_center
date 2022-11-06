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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.patients = require('./patient.model')(sequelize, Sequelize);
db.appointments = require('./appointment.model')(sequelize, Sequelize);
db.vaccines = require('./vaccine.model')(sequelize, Sequelize);
db.categories = require('./category.model')(sequelize, Sequelize);
db.vaccineCategories = require('./vaccine-category.model')(sequelize, Sequelize);

module.exports = db;
