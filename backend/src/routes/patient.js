var express = require('express');
var router = express.Router();
const { PatientController } = require('../controllers');

/* GET users listing. */
router.post('/', PatientController.create);
router.get('/', PatientController.find);
router.get('/:id', PatientController.findOne);
router.put('/:id', PatientController.update);
router.delete('/:id', PatientController.deletePatient);

module.exports = router;
