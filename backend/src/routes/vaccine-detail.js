var express = require('express');
var router = express.Router();
const { VaccineDetailControler } = require('../controllers');

/* GET users listing. */
router.post('/', VaccineDetailControler.create);
router.get('/', VaccineDetailControler.find);
router.get('/:id', VaccineDetailControler.findOne);
router.put('/:id', VaccineDetailControler.update);
router.delete('/:id', VaccineDetailControler.deleteVaccineDetail);

module.exports = router;
