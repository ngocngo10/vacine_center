var express = require('express');
var router = express.Router();
const { PatientController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, PatientController.create);
router.get('/', PatientController.find);
router.get('/:id', PatientController.findOne);
router.put('/:id', PatientController.update);
router.delete('/:id', PatientController.deletePatient);

module.exports = router;
