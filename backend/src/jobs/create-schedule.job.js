const { ScheduleConfigRepository } = require('../repositories');
const { ScheduleRepository } = require('../repositories');

function toHour(str) {
  const arr = str.split(':');
  if (arr.length == 2) arr.push('00');
  const [hour, min, sec] = str.split(':');
  return +hour + +min / 60 + +sec / 3600;
}
function hourToString(hourFloat) {
  const hour = hourFloat - (hourFloat % 1);
  const minute = Math.floor(hourFloat * 60 - hour * 60);
  const sec = hourFloat * 3600 - minute * 60;
  return [hour, minute, sec].map(item => ('0' + item).slice(-2)).join(':');
}

function addMinuteToStringHour(str, minute) {
  const hour = toHour(str) + minute / 60;
  return hourToString(hour);
}

async function createDailySchedules(date, db) {
  const {
    repository,
    scheduleConfigRepository
  } = db;  
  const scheduleConfigs = await scheduleConfigRepository.find();
  const scheduleConfig = scheduleConfigs[1] || scheduleConfigs[0];
  const morningTime = toHour(scheduleConfig.restTime) - toHour(scheduleConfig.startAt);
  let time = scheduleConfig.startAt;
  let index = 0;
  const schedules = [];
  while (time <= addMinuteToStringHour(scheduleConfig.endTime, - scheduleConfig.appointmentDuration)) {
    schedules.push({
      day: date,
      startAt: time,
      caseNumber: index,
      appointmentDuration: scheduleConfig.appointmentDuration,
      totalParticipant: scheduleConfig.participantNumber,
      registerParticipantNumber: 0
    });
    index++;
    time = addMinuteToStringHour(time, scheduleConfig.appointmentDuration);
  }
  startAfternoonHour = toHour(scheduleConfig.endTime) - (8 - morningTime);
  time = hourToString(startAfternoonHour);
  while (time <= addMinuteToStringHour(scheduleConfig.endTime, - scheduleConfig.appointmentDuration)) {
    schedules.push({
      day: date,
      startAt: time,
      caseNumber: index,
      appointmentDuration: scheduleConfig.appointmentDuration,
      totalParticipant: scheduleConfig.participantNumber,
      registerParticipantNumber: 0
    });
    index++;
    time = addMinuteToStringHour(time, scheduleConfig.appointmentDuration);
  }
  await repository.model.bulkCreate(schedules);
}

async function createSchedules(fromDate, toDate) {
  const repository = new ScheduleRepository();
  const scheduleConfigRepository = new ScheduleConfigRepository();
  const db = {
    repository,
    scheduleConfigRepository
  }
  let timer = fromDate.clone()
  while (toDate.diff(timer, 'days') > -1) {
    await createDailySchedules(timer.format('YYYY-MM-DD'), db);
    timer.add(1, 'days');
  }
}

module.exports = {
  createSchedules,
  createDailySchedules
}
