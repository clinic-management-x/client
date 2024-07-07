export const sortSchedules = (schedules: ScheduleType[]) => {
  return schedules?.sort((a, b) => {
    if (a.start > b.start) {
      return 1;
    } else if (a.start < b.start) {
      return -1;
    }
    return 1;
  });
};
