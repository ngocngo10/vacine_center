const db = require("../models");
const BaseRepository = require("../utils/base_repository");
const Vaccine = db.vaccines;
const VaccineCategory = db.vaccineCategories;
const Op = db.Sequelize.Op;

module.exports = class VaccineRepository extends BaseRepository {
  constructor() {
    super();
    this.vaccinceCategoryModel = VaccineCategory;
    this.model = Vaccine;
  }
  async createVaccine(data, categoryId) {
    const vaccine = await this.create(data);
    const vaccineCategory = {
      vaccineId: vaccine.id,
      categoryId,
    }
    await this.vaccinceCategoryModel.create(vaccineCategory);
    return;
  }
}
