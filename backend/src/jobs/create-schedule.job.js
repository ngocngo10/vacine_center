const { ScheduleConfigRepository } = require('../repositories');
const { ScheduleRepository } = require('../repositories');

async function createSchedules(date) {
  const repository = new ScheduleRepository();  
  const scheduleConfigRepository = new ScheduleConfigRepository();
  const scheduleConfig = await scheduleConfigRepository.find();
  const morningTime = scheduleConfig.restTime - scheduleConfig.startAt;
  let time = scheduleConfig.startAt;
  let index = 0;
  const schedules = [];
  while (time < scheduleConfig.restTime) {
    schedules.push({
      day: date,
      startAt: time,
      caseNumber: index,
      appointmentDuration: scheduleConfig.appointmentDuration,
      totalParticipant: scheduleConfig.participantNumber,
      registerParticipantNumber: 0
    });
    index++;
    time += scheduleConfig.appointmentDuration;
  }
  time = scheduleConfig.endTime - (8 - morningTime);
  while (time < scheduleConfig.endTime) {
    schedules.push({
      day: date,
      startAt: time,
      caseNumber: index,
      appointmentDuration: scheduleConfig.appointmentDuration,
      totalParticipant: scheduleConfig.participantNumber,
      registerParticipantNumber: 0
    });
    index++;
    time += scheduleConfig.appointmentDuration;
  }
  await repository.model.bulkCreate(schedules);
}
function toHour(timeStr) {
  if (!timeStr.includes(":")) return parseFloat(timeStr);
  const [hour, min, secs] = timeStr.split(":");
  return Math.round((+hour + +min / 60 + +secs / 3600) * 1000) / 1000;
}
function toTime(hourFloat) {
  const hour = hourFloat - (hourFloat % 1);
  const minFloat = (hourFloat % 1) * 60;
  const secFloat = (minFloat) % 1;
  const mins = Math.floor(minFloat);
  const secs = Math.round(secFloat * 60);
  return [hour, mins, secs].join(':');
}
module.exports = {
  createSchedules
}
