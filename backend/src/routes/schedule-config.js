var express = require('express');
var router = express.Router();
const { ScheduleConfig } = require('../controllers');

/* GET users listing. */
router.post('/', ScheduleConfig.create);
router.get('/', ScheduleConfig.findOne);
router.put('/:id', ScheduleConfig.update);

module.exports = router;
