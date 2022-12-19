const { Op } = require('sequelize');
const { PatientRepository, AppointmentRepository, VaccineRepository, InjectionRepository } = require('../repositories');
const { sequelize, User, Appointment, ScreeningTest, Injection, Vaccine } = require('../models');
module.exports = class PatientService {
  constructor() {
    this.repository = new PatientRepository();
    this.appointmentRepo = new AppointmentRepository();
    this.sequelize = sequelize;
    this.injectionRepo = new InjectionRepository();
    this.vaccineRepo = new VaccineRepository();
  }
  async create(data) {
    await this.repository.create(data);
    return;
  }

  async update(id, body) {
    const updateData = {
      ...body
    };
    await this.repository.update(id, updateData);
    return;
  }

  async find(reqQuery, userId = 0) {
    const findOptions = {
      where: {
        '$appointments.check_in_at$': {
          [Op.not]: null
        }
      },
      include: [
        {
          model: Appointment,
          as: 'appointments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'email', 'phoneNumber']
            },
            {
              model: ScreeningTest,
              as: 'screeningTest',
            },
            {
              model: Injection,
              as: 'injections',
              include: [
                {
                  model: Vaccine,
                  as: 'vaccine'
                }
              ]
            },
          ]
        }
      ]
    };
    if (reqQuery.representative) {
      findOptions.where.representative = reqQuery.representative;
    }
    reqQuery.patientName &&
      (findOptions.where.patientName = {
        [Op.like]: `%${reqQuery.patientName}%`
      });
    if (reqQuery.page) {
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }

    if (reqQuery.orderBy) {
      findOptions.order = [reqQuery.orderBy, reqQuery.orderType || 'DESC'];
    }
    if (reqQuery.patientCode) {
      findOptions.where.patientCode = reqQuery.patientCode;
    }
    if (userId) {
      findOptions.where.representative = userId;
    }
    return await this.repository.find(findOptions);
  }

  async findOne(id) {
    return await this.repository.findOne(id, [
      {
        model: Appointment,
        as: 'appointments',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email', 'phoneNumber']
          },
          {
            model: ScreeningTest,
            as: 'screeningTest',
          },
          {
            model: Injection,
            as: 'injections',
            include: [
              {
                model: Vaccine,
                as: 'vaccine'
              }
            ]
          },
        ]
      }
    ]);
  }

  async deletePatient(id) {
    return await this.repository.delete(id);
  }

  async injectionHistories(id, reqQuery) {
    const findOptions = {
      where: {
        [`$appointment.patient_id$`]: id
      },
      include: ['appointment', 'vaccine'],
      order: [['createdAt', 'DESC']]
    };
    if (reqQuery.vaccineName) {
      findOptions.where[`$vaccine.name$`] = {
        [Op.like]: `%${reqQuery.vaccineName}%`
      }
    }
    reqQuery.vaccineCode &&
      (findOptions.where[`$vaccine.vaccine_code$`] = reqQuery.vaccineCode);

    if (reqQuery.page) {
      findOptions.limit = +reqQuery.perPage || 10;
      findOptions.offset = (+reqQuery.page - 1) * findOptions.limit;
    }
    console.log(findOptions);
    const vaccines = await this.injectionRepo.model.findAndCountAll(findOptions);
    const histories = await vaccines.rows.map(item => {
      return {
        vaccineId: item.vaccine.id,
        vaccineCode: item.vaccine.vaccineCode,
        vaccineName: item.vaccine.name,
        injectionTime: item.injectionTime,
        price: item.price,
        injectionAt: item.createdAt,
      }
    });

    return {
      count: vaccines.count,
      rows: histories
    }
  }
}

