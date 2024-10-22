import dayjs, { Dayjs } from "dayjs";

export const getCustomDay = (day: number) => {
  return (day + 6) % 7;
};

export const calculateMinutes = (value: Dayjs | null, day: number) => {
  const hour = dayjs(value).format("H");
  const minutes = dayjs(value).minute();
  const totalMinutes = day * 1440 + +hour * 60 + minutes;
  return totalMinutes;
};

export const calculateTime = (time: number) => {
  const hour = Math.trunc(time / 60);
  const minutesLeft = time - hour * 60;
  const timeData = dayjs().set("hour", hour).set("minute", minutesLeft);
  return timeData.format("h:mm A");
};

export const calculateDayjs = (time: number) => {
  const hour = Math.trunc(time / 60);
  const minutesLeft = time - hour * 60;
  const timeData = dayjs().set("hour", hour).set("minute", minutesLeft);
  return timeData;
};

// ################################################### //

// schedule display ui in appointment create //

// ################################################### //

// 1440 is minutes in a day and 10080 is minutes in a week

export const getTimestampsForSchedule = (
  schedule: ScheduleType,
  timeinterval: number,
  stamps: number[]
) => {
  let time = schedule.start;

  if (schedule.start < schedule.end) {
    while (time <= schedule.end) {
      stamps.push(time);
      time += timeinterval;
    }
  } else {
    while (time < 10080) {
      stamps.push(time);
      time += timeinterval;
    }
    time = time - 10080;
    while (time <= schedule.end) {
      stamps.push(time);
      time += timeinterval;
    }
  }
};

export const filterTimestampsByDay = (stamps: number[], currentDay: number) => {
  return stamps.filter((stamp) => Math.floor(stamp / 1440) === currentDay);
};

export const convertStampsToISO = (stamps: number[], date: dayjs.Dayjs) => {
  return stamps.map((stamp) => {
    const hours = Math.floor((stamp % 1440) / 60);
    const minutes = stamp % 60;
    return date?.set("hour", hours).set("minute", minutes)?.toISOString();
  });
};

export const filterTimestampsByTimeRange = (
  timeStamps: string[],
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
) => {
  return timeStamps.filter(
    (idata) =>
      dayjs(idata).format("DD MMM YYYY hh:mm a") ===
        start.format("DD MMM YYYY hh:mm a") ||
      (dayjs(idata).isAfter(start) && dayjs(idata).isBefore(end))
  );
};
