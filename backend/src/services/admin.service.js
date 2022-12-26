const {
  UserRepository,
  VaccineItemRepository,
  PatientRepository,
  VaccineRepository,
  AppointmentRepository,
  InjectionRepository
} = require('../repositories');

const moment = require('moment-timezone');
const { Op, QueryTypes } = require('sequelize');
const ErrorCreator = require('../utils/error_creator');
const { VaccineItem, Injection, sequelize } = require('../models');

module.exports = class AdminService {
  constructor() {
    this.repository = new UserRepository();
    this.vaccineItemRepo = new VaccineItemRepository();
    this.patientRepo = new PatientRepository();
    this.vaccineRepo = new VaccineRepository();
    this.appointmentRepo = new AppointmentRepository();
    this.injectionRepo = new InjectionRepository();
  }
  async blockUser(id) {
    await this.repository.update(id, { isBlocked: true });
  }

  async unblockUser(id) {
    await this.repository.update(id, { isBlocked: false });
  }

  async unblockMultiUser(ids) {
    await this.repository.model.update({ where: { id: ids } }, { isBlocked: false });
  }

  async blockMultiUser(ids) {
    await this.repository.model.update({ where: { id: ids } }, { isBlocked: true });
  }

  async statistics(query) {
    const { searchBy, searchItem } = query;
    const userOptions = { where: {} };
    const vaccineOptions = { where: {} };
    const patientOptions = { where: {} };
    let startTime, endTime;
    if (searchBy === 'month') {
      startTime = searchItem ? moment(searchItem).startOf('day') : moment().startOf('month').startOf('day');
      endTime = startTime.clone().add(1, 'months');
    } else {
      startTime = searchItem ? moment(searchItem).startOf('day') : moment().startOf('day');
      endTime = startTime.clone().add(1, 'days');
    }

    userOptions.where.createdAt = {
      [Op.gte]: startTime.format('YYYY-MM-DD'),
      [Op.lt]: endTime.format('YYYY-MM-DD')
    };
    patientOptions.where.createdAt = {
      [Op.gte]: startTime.format('YYYY-MM-DD'),
      [Op.lt]: endTime.format('YYYY-MM-DD')
    };
    vaccineOptions.where.createdAt = {
      [Op.gte]: startTime.format('YYYY-MM-DD'),
      [Op.lt]: endTime.format('YYYY-MM-DD')
    };

    const users = await this.repository.model.findAll(userOptions);
    const patients = await this.patientRepo.model.findAll(patientOptions);
    const vaccines = await this.vaccineRepo.model.findAll({
      attributes: [
        'id',
        'name',
        'image',
        'vaccineCode',
        [sequelize.fn('COUNT', sequelize.col('injections.vaccine_id')), 'total']],
      include: [
        {
          model: Injection,
          attributes: [],
          where: {
            ['$injections.createdAt$']: vaccineOptions.where.createdAt
          },
          as: 'injections'
        }
      ],
      take: 10,
      order: [['total', 'DESC']],
      as: 'vaccines',
      group: 'vaccines.id',
    });
    const vaccineTotal = await this.vaccineRepo.model.findAll({
      attributes: [
        'id',
        'name',
        'image',
        'vaccineCode',
        [sequelize.fn('COUNT', sequelize.col('injections.vaccine_id')), 'total']],
      include: [
        {
          model: Injection,
          attributes: [],
          where: {
            ['$injections.createdAt$']: {
              [Op.lt]: moment().format('YYYY-MM-DD')
            }
          },
          as: 'injections'
        }
      ],
      take: 10,
      order: [['total', 'DESC']],
      as: 'vaccines',
      group: 'vaccines.id',
    });
    console.log(startTime.format('YYYY-MM-DD'));
    const appointments = (await sequelize.query(`
      SELECT count(*) AS total,
        sum(case when is_confirmed IS NULL then 1 else 0 end) AS unconfirmed,
        sum(case when is_confirmed = TRUE and check_in_at IS NOT NULL then 1 else 0 end) AS checkIn
      FROM appointments
      WHERE "appointments"."desired_date" < :end_time and "appointments"."desired_date" >= :start_time
    `, {
      replacements: {
        start_time: startTime.format('YYYY-MM-DD'),
        end_time: endTime.format('YYYY-MM-DD')
      },
    }))[0];

    const injections = await this.injectionRepo.model.count(userOptions)
    return {
      users: users.length,
      patients: patients.length,
      vaccines,
      totalVaccines: vaccineTotal,
      appointments: {
        total: appointments[0].total,
        unconfirmed: appointments[0].unconfirmed,
        checkIn: appointments[0].checkin,
        cancel: +appointments[0].total - +appointments[0].unconfirmed - +appointments[0].checkin
      },
      totalInjection: injections
    }
  }
};
