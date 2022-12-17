var express = require('express');
var router = express.Router();
const { ScheduleConfig } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/', authMiddleware.validateToken, authMiddleware.isAdmin, ScheduleConfig.create);

router.get('/', authMiddleware.validateToken, authMiddleware.isAdmin, ScheduleConfig.findOne);

router.put('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, ScheduleConfig.update);

module.exports = router;
