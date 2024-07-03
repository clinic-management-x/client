export const areSchedulesOverlapping = (schedules: ScheduleType[]) => {
  const emptySchedule = schedules.find(
    (schedule) => schedule.start === schedule.end
  );
  if (emptySchedule) return true;

  // Should have at most 1 boundary schedule
  const boundaries = schedules.filter(
    (schedule) => schedule.start > schedule.end
  );
  if (boundaries.length > 1) return true;

  // Make schedules ascending by start
  schedules.sort((x, y) => {
    return x.start < y.start ? -1 : 1;
  });

  let current = schedules[0];
  for (let i = 1; i < schedules.length; i++) {
    const schedule = schedules[i];
    if (schedule.start < current.end) return true;
    current = schedule;
  }

  if (boundaries.length > 0 && schedules[0].start < current.end) return true;

  return false;
};
