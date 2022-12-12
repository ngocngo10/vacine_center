module.exports = (sequelize, Sequelize) => {
  const VaccineItem = sequelize.define(
    'vaccine_items',
    {
      importDate: {
        field: 'import_date',
        type: Sequelize.DATE
      },
      manufactureDate: {
        field: 'manufacture_date',
        type: Sequelize.DATE
      },
      productionBatch: {
        field: 'production_batch',
        type: Sequelize.STRING
      },
      expirationDate: {
        field: 'expiration_date',
        type: Sequelize.DATE
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      supplier: {
        type: Sequelize.STRING
      },
      supplierPhoneNumber: {
        field: 'supplier_phone_number',
        type: Sequelize.STRING
      },
      price: {
        field: 'price',
        type: Sequelize.FLOAT
      },
      vaccineCode: {
        field: 'vaccine_code',
        type: Sequelize.TEXT
      }
    },
    {
      paranoid: true
    }
  );

  return VaccineItem;
};
