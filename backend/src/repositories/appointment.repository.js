const db = require('../models');
const BaseRepository = require('../utils/base_repository');
const Appointment = db.Appointment;
const Op = db.Sequelize.Op;

module.exports = class AppointmentRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Appointment;
  }
};
