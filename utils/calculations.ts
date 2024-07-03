import dayjs, { Dayjs } from "dayjs";

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
