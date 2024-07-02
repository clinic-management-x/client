export const sortSchedules = (schedules: ScheduleType[]) => {
  return schedules?.sort((a, b) => {
    if (a.startDay > b.startDay) {
      return 1;
    } else if (a.startDay < b.startDay) {
      return -1;
    } else if (a.startDay === b.startDay) {
      return a.startTime < b.startTime ? -1 : 1;
    }
    return 1;
  });
};
