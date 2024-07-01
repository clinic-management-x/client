export const checkInvalidSchedule = (
  newSchedule: ScheduleType,
  schedules: ScheduleType[]
) => {
  const notValid = schedules.find((schedule) => {
    if (schedule.startTime < schedule.endTime) {
      return (
        (newSchedule.startTime >= schedule.startTime &&
          newSchedule.endTime <= schedule.endTime) ||
        (newSchedule.startTime >= schedule.startTime &&
          newSchedule.startTime <= schedule.endTime) ||
        (newSchedule.endTime <= schedule.endTime &&
          newSchedule.endTime >= schedule.startTime)
      );
    } else {
      return (
        (newSchedule.startTime >= 0 &&
          newSchedule.startTime <= schedule.endTime) ||
        (newSchedule.endTime >= 0 && newSchedule.endTime <= schedule.endTime) ||
        (newSchedule.startTime >= schedule.startTime &&
          newSchedule.startTime <= 1440 * 7) ||
        (newSchedule.endTime >= schedule.startTime &&
          newSchedule.endTime <= 1440 * 7)
      );
    }
  });
  return notValid;
};
