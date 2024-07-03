import PlainSelector from "@/components/selectors/PlainSelector/page";
import { Box } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CustomTimePicker from "@/components/selectors/CustomTimePicker/page";
import CrossButton from "@/components/buttons/CrossButton/page";
import CheckButton from "@/components/buttons/CheckButton/page";
import { Dayjs } from "dayjs";
import { days } from "@/utils/staticData";

interface Props {
  newSchedule: ScheduleType;
  handleStartDayChange: (e: any) => void;
  handleEndDayChange: (e: any) => void;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  handleStartTimeChange: (value: Dayjs | null) => void;
  handleEndTimeChange: (value: Dayjs | null) => void;
  handleClose: () => void;
  handleCheck: () => void;
}
const CreateScheduleDialog = ({
  newSchedule,
  handleStartDayChange,
  handleEndDayChange,
  startTime,
  endTime,
  handleStartTimeChange,
  handleEndTimeChange,
  handleCheck,
  handleClose,
}: Props) => {
  return (
    <Box className="relative w-full md:w-[80%] border-[1px] my-2 flex flex-col  justify-around p-2 md:p-4 md:ml-4 dark:bg-[#3C3C3C] dark:border-gray-400 bg-stone-100 rounded-lg border-gray-300">
      <Box className="flex flex-col md:flex-row md:justify-between w-full">
        <Box className="flex flex-col space-y-2">
          <PlainSelector
            selectedValue={newSchedule.startDay}
            handleChange={(e) => handleStartDayChange(e)}
            dataArr={days}
            title="Start Day"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomTimePicker
              selectedValue={startTime}
              handleChange={(value) => handleStartTimeChange(value)}
            />
          </LocalizationProvider>
        </Box>
        <Box className="flex items-center justify-center my-2 md:my-0 dark:text-gray-400 text-gray-500">
          To
        </Box>
        <Box className="flex flex-col space-y-2">
          <PlainSelector
            selectedValue={newSchedule.endDay}
            handleChange={(e) => handleEndDayChange(e)}
            dataArr={days}
            title="End Day"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomTimePicker
              selectedValue={endTime}
              handleChange={(value) => handleEndTimeChange(value)}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box className="flex items-center justify-center mt-2  space-x-2">
        <CrossButton handleClick={handleClose} />
        <CheckButton handleClick={handleCheck} />
      </Box>
    </Box>
  );
};

export default CreateScheduleDialog;
