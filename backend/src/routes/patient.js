var express = require('express');
var router = express.Router();
const { PatientController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

/* GET users listing. */
router.post('/', authMiddleware.validateToken, PatientController.create);
router.get('/', authMiddleware.validateToken, PatientController.find);
router.get('/:id', authMiddleware.validateToken, PatientController.findOne);
router.put('/:id', authMiddleware.validateToken, PatientController.update);
router.delete('/:id', authMiddleware.validateToken, PatientController.deletePatient);

module.exports = router;
