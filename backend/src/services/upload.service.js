const { VaccineItemRepository } = require('../repositories');
const aws = require('aws-sdk');
aws.config.region = 'ap-southeast-1';
var XLSX = require('xlsx');
const { sequelize } = require('../models');

module.exports = class UploadService {
  constructor() {
    this.repository = new VaccineItemRepository();
  }
  async uploadVaccineItem(req) {
    const s3 = new aws.S3({
      apiVersion: '2006-03-01',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'ap-southeast-1'
    });
    const bucketName = process.env.S3_BUCKET + '/vaccines';
    const fileKey = req.body.fileName;

    // Simple GetObject
    let file = await s3.getObject({ Bucket: bucketName, Key: fileKey }).promise();

    var workbook = XLSX.read(file.Body);
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list);
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
      header: [
        'vaccineCode',
        'supplier',
        'supplierPhoneNumber',
        'productionBatch',
        'manufactureDate',
        'expirationDate',
        'quantity',
        'price'
      ],
      raw: false
    });
    xlData.shift();
    console.log(xlData);
    try {
      const t = await sequelize.transaction();
      await this.repository.model.bulkCreate(xlData);
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};
