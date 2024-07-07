import AddButton from "@/components/buttons/AddButton/page";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import DeleteDialog from "@/components/dialogs/Delete";
import CreateScheduleDialog from "@/components/dialogs/doctors/CreateScheduleDialog/page";
import ScheduleListItem from "@/components/dialogs/doctors/ScheduleListItem/ScheduleListItem";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  createSchedules,
  deleteSchedule,
  updateSchedule,
} from "@/datafetch/doctors/doctors.api";
import { calculateDayjs, calculateMinutes } from "@/utils/calculations";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import { areSchedulesOverlapping } from "@/utils/schedule";
import { sortSchedules } from "@/utils/sorting";
import { defaultNewSchedule } from "@/utils/staticData";
import { Box, Divider } from "@mui/material";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

interface Props {
  schedules: ScheduleType[];
  setSchedules: (data: ScheduleType[]) => void;
  doctor: DoctorType;
  mutate: any;
}

const Schedules = ({ schedules, setSchedules, doctor, mutate }: Props) => {
  const [newSchedules, setNewSchedules] = useState<ScheduleType[]>([]);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [newSchedule, setNewSchedule] =
    useState<ScheduleType>(defaultNewSchedule);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(
    null
  );
  const [scheduleToDelete, setScheduleToDelete] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  //swr

  const { trigger: triggerUpdateSchedule, isMutating: updatedMutating } =
    useSWRMutation(
      `${config.apiBaseUrl}/${doctorEndPoint}/schedules/${selectedSchedule?._id}`,
      updateSchedule
    );
  const { trigger: triggerCreateSchedules, isMutating: createMutating } =
    useSWRMutation(
      `${config.apiBaseUrl}/${doctorEndPoint}/schedules`,
      createSchedules
    );
  const { trigger: triggerDelete, isMutating: deleteMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${doctorEndPoint}/schedules/${scheduleToDelete}`,
    deleteSchedule
  );

  const clearScheduleData = () => {
    setStartTime(null);
    setEndTime(null);
    setNewSchedule(defaultNewSchedule);
    setShowTimeSelector(false);
  };

  return (
    <>
      <Box className=" mx-2 md:px-2   lg:px-8 flex flex-col justify-center items-center mt-4">
        <div className=" self-start lg:ml-28">
          <LabelTypography title="Schedules" />
          <AddButton
            handleClick={() => {
              setShowTimeSelector(true);
            }}
          />
        </div>

        {showTimeSelector ? (
          <CreateScheduleDialog
            startTime={startTime}
            endTime={endTime}
            newSchedule={newSchedule}
            handleStartDayChange={(e) => {
              setNewSchedule({
                ...newSchedule,
                startDay: +e.target.value,
                start: calculateMinutes(startTime, +e.target.value),
              });
            }}
            handleEndDayChange={(e) => {
              setNewSchedule({
                ...newSchedule,
                endDay: +e.target.value,
                end: calculateMinutes(endTime, +e.target.value),
              });
            }}
            handleStartTimeChange={(value) => {
              setNewSchedule({
                ...newSchedule,
                start: calculateMinutes(value, Number(newSchedule.startDay)),
              });
              setStartTime(value);
            }}
            handleEndTimeChange={(value) => {
              setNewSchedule({
                ...newSchedule,
                end: calculateMinutes(value, Number(newSchedule.endDay)),
              });
              setEndTime(value);
            }}
            handleCheck={() => {
              if (
                areSchedulesOverlapping([
                  ...schedules,
                  ...newSchedules,
                  newSchedule,
                ])
              ) {
                return toast.error("Schedules overlapped.");
              } else if (
                newSchedule.startDay === newSchedule.endDay &&
                newSchedule.start > newSchedule.end
              ) {
                return toast.error("Start time must be less than end time.");
              }
              const newArr = [
                ...newSchedules,
                { ...newSchedule, _id: schedules.length + 1 },
              ];
              setNewSchedules(newArr);

              clearScheduleData();
            }}
            handleClose={clearScheduleData}
            edit={true}
          />
        ) : (
          <></>
        )}
        {newSchedules.map((newschedule, index) => (
          <ScheduleListItem
            key={index}
            handleRemove={() => {
              setNewSchedules(
                newSchedules.filter((data) => data._id !== newschedule._id)
              );
            }}
            schedule={newschedule}
            edit={true}
          />
        ))}
        <div className="mt-2 m-auto ">
          <DetailEditCancelButton
            show={newSchedules.length > 0}
            handleCancel={() => {
              setNewSchedules([]);
            }}
            handleUpdate={async () => {
              try {
                const data = await triggerCreateSchedules({
                  schedules: newSchedules,
                  doctor: doctor._id as string,
                });
                if (data) {
                  mutate();
                  toast.success("Successfully added.");
                  setSchedules(schedules.concat(newSchedules));
                  setNewSchedules([]);
                }
              } catch (error) {
                toast.error("Something went wrong.");
              }
            }}
            loading={createMutating}
          />
        </div>
        <Divider
          sx={{
            my: 1,
          }}
        />
        {sortSchedules(schedules)?.map((schedule: ScheduleType, index) =>
          selectedSchedule && selectedSchedule._id === schedule._id ? (
            <CreateScheduleDialog
              key={schedule._id}
              startTime={startTime}
              endTime={endTime}
              newSchedule={selectedSchedule}
              handleStartDayChange={(e) => {
                setSelectedSchedule({
                  ...selectedSchedule,
                  startDay: +e.target.value,
                  start: calculateMinutes(startTime, +e.target.value),
                });
              }}
              handleEndDayChange={(e) => {
                setSelectedSchedule({
                  ...selectedSchedule,
                  endDay: +e.target.value,
                  end: calculateMinutes(endTime, +e.target.value),
                });
              }}
              handleStartTimeChange={(value) => {
                setSelectedSchedule({
                  ...selectedSchedule,
                  start: calculateMinutes(
                    value,
                    Number(selectedSchedule.startDay)
                  ),
                });
                setStartTime(value);
              }}
              handleEndTimeChange={(value) => {
                setSelectedSchedule({
                  ...selectedSchedule,
                  end: calculateMinutes(value, Number(selectedSchedule.endDay)),
                });
                setEndTime(value);
              }}
              handleCheck={async () => {
                const updatedScheules = schedules.map((scheduledata) => {
                  return scheduledata._id === selectedSchedule._id
                    ? selectedSchedule
                    : scheduledata;
                });
                if (areSchedulesOverlapping(updatedScheules)) {
                  return toast.error("Schedules overlapped.");
                } else if (
                  selectedSchedule.startDay === selectedSchedule.endDay &&
                  selectedSchedule.start > selectedSchedule.end
                ) {
                  return toast.error("Start time must be less than end time.");
                }
                try {
                  const response = await triggerUpdateSchedule(
                    selectedSchedule
                  );
                  if (response) {
                    toast.success("Successfully updated.");
                    mutate();
                    setSchedules(updatedScheules);
                    setSelectedSchedule(null);
                  }
                } catch (error) {
                  toast.error("Something went wrong.");
                }
              }}
              handleClose={() => {
                setSelectedSchedule(null);
                setStartTime(null);
                setEndTime(null);
              }}
              edit={true}
            />
          ) : (
            <ScheduleListItem
              key={index}
              handleRemove={() => {
                setOpenDeleteBox(true);
                setScheduleToDelete(schedule._id as string);
              }}
              handleEdit={() => {
                setSelectedSchedule({
                  _id: schedule._id,
                  start: schedule.start,
                  end: schedule.end,
                  startDay:
                    schedule.start <= 1440
                      ? 0
                      : Math.ceil(schedule.start / 1440 - 1),
                  endDay:
                    schedule.start <= 1440
                      ? 0
                      : Math.ceil(schedule.end / 1440 - 1),
                });

                setStartTime(calculateDayjs(schedule.start % 1440));
                setEndTime(calculateDayjs(schedule.end % 1440));
              }}
              schedule={schedule}
              edit={true}
            />
          )
        )}
      </Box>
      <DeleteDialog
        open={openDeleteBox}
        handleClose={() => {
          setOpenDeleteBox(false);
        }}
        text="this schedule"
        handleDelete={async () => {
          try {
            const response = await triggerDelete();
            if (response) {
              mutate();
              toast.success("Successfully deleted.");
              setSchedules(
                schedules.filter((data) => data._id !== scheduleToDelete)
              );
              setOpenDeleteBox(false);
            }
          } catch (error) {
            toast.error("Something went wrong.");
          }
        }}
        loading={deleteMutating}
      />
    </>
  );
};

export default Schedules;
