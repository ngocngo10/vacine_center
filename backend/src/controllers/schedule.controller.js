const { ScheduleService } = require('../services');
const ErrorCreator = require('../utils/error_creator');
const scheduleService = new ScheduleService();
async function create(req, res, next) {
  try {
    await scheduleService.create(req.body);
    return res.json({
      message: 'Schedule is created successfully'
    });
  } catch (error) {
    next(error);
  }
}

async function find(req, res, next) {
  try {
    const schedules = await scheduleService.find(req.query);
    return res.json(schedules);
  } catch (error) {
    next(error);
  }
}

async function findOne(req, res, next) {
  try {
    const schedule = await scheduleService.findOne(req.params.id);
    return res.json({ schedule });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await scheduleService.update(req.params.id, req.body);
    return res.json({ message: 'Updated.' });
  } catch (error) {
    next(error);
  }
}

async function deleteSchedule(req, res, next) {
  try {
    await scheduleService.deleteSchedule(req.params.id);
    return res.json({ message: 'Deleted.' });
  } catch (error) {
    next(error);
  }
}
async function deleteMulti(req, res, next) {
  try {
    await scheduleService.deleteMulti(req.body.ids);
    return res.json({ message: 'Deleted.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  find,
  findOne,
  update,
  deleteSchedule,
  deleteMulti
};
