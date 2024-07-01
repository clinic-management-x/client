import { calculateTime } from "@/utils/calculations";
import { Box, Typography } from "@mui/material";
import React from "react";
import TrashButton from "@/components/buttons/TrashButton/page";
import { days } from "@/utils/staticData";

interface Props {
  schedule: ScheduleType;
  handleRemove: () => void;
}
const ScheduleListItem = ({ schedule, handleRemove }: Props) => {
  return (
    <Box className="mt-2 w-full md:w-[80%] relative h-auto md:h-[50px] md:p-7 md:ml-4 bg-stone-100 dark:bg-[#3C3C3C] dark:border-gray-400 border-[1px] rounded-lg border-gray-300 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
      <Typography className="font-bold text-gray-500 dark:text-gray-400">
        {days.find((day) => day._id === schedule.startDay)?.name},{" "}
        {calculateTime(schedule.startTime)}
      </Typography>
      <Typography className="text-[15px text-gray-500 dark:text-gray-400">
        To
      </Typography>
      <Typography className="font-bold text-gray-500 dark:text-gray-400">
        {days.find((day) => day._id === schedule.endDay)?.name},{" "}
        {calculateTime(schedule.endTime)}
      </Typography>

      <Box className=" flex items-center absolute  bottom-0 right-0 md:bottom-0 md:right-0 md:relative">
        <TrashButton handleClick={handleRemove} />
      </Box>
    </Box>
  );
};

export default ScheduleListItem;
