const { VaccinRepository } = require('../repositories');
const ErrorCreator = require('../utils/error_createtor');
const { Op } = require("sequelize");

module.exports = class VaccineService {
  constructor() {
    this.repository = new VaccinRepository();
  }
  async create(bodyRequest) {
    const categoryId = bodyRequest.categoryId;
    const {
      name,
      description,
      origin,
      injectionRoute,
      contraindications,
      drugInteractions,
      sideEffects,
      conserve,
      affectPregnancy,
      injectedNumberTotal,
      price
    } = bodyRequest;
    const data = {
      name,
      description,
      origin,
      injectionRoute,
      contraindications,
      drugInteractions,
      sideEffects,
      conserve,
      affectPregnancy,
      injectedNumberTotal,
      price
    };
    try {
      this.repository.createVaccine(data, categoryId);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async update(id, body) {
    const findCondition = { id };
    const updateData = {
      ...body
    }
    try {
      await this.repository.update(findCondition, updateData);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async find(reqQuery) {
    let findConditions = {};
    if (reqQuery.name) {
      findConditions = {
        name: {
          [Op.substring]: reqQuery.name
        }
      }
    }

    const other = {};
    if (reqQuery.page) {
      other.page = +reqQuery.page;
    }
    if (reqQuery.perPage) {
      other.perPage = +reqQuery.perPage;
    }
    if (reqQuery.orderBy) {
      other.orderBy = reqQuery.orderBy;
    }
    if (reqQuery.orderType) {
      other.orderType = reqQuery.orderType;
    }
    try {
      const vaccines = await this.repository.find(
        Object.keys(findConditions).length ? findConditions : null,
        Object.keys(other).length ? other : null);
      return vaccines;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async findOne(id) {
    try {
      const vaccine = await this.repository.findOne({ id });
      return vaccine;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }

  async deleteVaccine(id) {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new ErrorCreator(error.message, 500);
    }
  }
}
