"use client";
import _ from "lodash";
import AddButton from "@/components/buttons/AddButton/page";
import BasicDoctorInfo from "@/components/dialogs/doctors/BasicInfo/page";
import CreateScheduleDialog from "@/components/dialogs/doctors/CreateScheduleDialog/page";
import ScheduleListItem from "@/components/dialogs/doctors/ScheduleListItem/ScheduleListItem";
import DropZone from "@/components/fileupload/DropZone/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  createSchedules,
  deleteDoctor,
  deleteSchedule,
  getDoctor,
  updateDoctor,
  updateSchedule,
} from "@/datafetch/doctors/doctors.api";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import { calculateDayjs, calculateMinutes } from "@/utils/calculations";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import { sortSchedules } from "@/utils/sorting";
import { defaultInfo, defaultNewSchedule } from "@/utils/staticData";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { KeyedMutator } from "swr";
import useSWRMutation from "swr/mutation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { areSchedulesOverlapping } from "@/utils/schedule";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import DeleteDialog from "@/components/dialogs/Delete";
import DeleteDoctorDialog from "@/components/dialogs/doctors/DeleteDoctorDialog/page";

const EditDoctorPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const [doctor, setDoctor] = useState<DoctorType>(defaultInfo);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [newSchedule, setNewSchedule] =
    useState<ScheduleType>(defaultNewSchedule);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(
    null
  );
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [newSchedules, setNewSchedules] = useState<ScheduleType[]>([]);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [showEditButtonBox, setShowEditButtonBox] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState("");
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [openDeleteDoctorDialog, setOpenDeleteDoctorDialog] = useState(false);
  const { data, isLoading, isValidating, mutate } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}`,
    getDoctor
  );

  const { trigger, isMutating: detailMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}/details`,
    updateDoctor
  );

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
  const { trigger: triggerDeleteDoctor, isMutating: deleteDoctorMutating } =
    useSWRMutation(
      `${config.apiBaseUrl}/${doctorEndPoint}/${id}`,
      deleteDoctor
    );

  useEffect(() => {
    if (data) {
      const doctordata = { ...data, mobile: data.mobile.substring(4) };
      data.avatarUrl ? setPreviewUrl(data.avatarUrl) : setPreviewUrl("");
      setSchedules(data.schedules);
      delete doctordata.avatarUrl;
      setDoctor(doctordata);
    }
  }, [data]);

  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DOCTOR_AVATAR");
    const filedata = await uploadFile(formData);
    setShowEditButtonBox(true);
    setPreviewUrl(filedata.presignedUrl);
    setDoctor({ ...doctor, avatarUrl: filedata.url });
  };
  //console.log("doc", doctor);

  const clearScheduleData = () => {
    setStartTime(null);
    setEndTime(null);
    setNewSchedule(defaultNewSchedule);
    setShowTimeSelector(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await trigger(doctor);

      if (response) {
        mutate();
        //mutateDoctors();
        console.log("res", response);
        toast.success("Successfully added.");
        setShowEditButtonBox(false);
        setDoctor({ ...response, mobile: data.mobile.substring("4") });
        response.avatarUrl
          ? setPreviewUrl(response.avatarUrl)
          : setPreviewUrl("");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col overflow-y-scroll ">
      <Box sx={{ mb: 50 }}>
        <Box className="flex items-center justify-start ml-2 mt-20 md:mt-2">
          <IconButton
            onClick={() => {
              router.push("/backoffice/doctors");
            }}
          >
            <IoMdArrowRoundBack className="dark:text-darkText text-whiteText" />
          </IconButton>
          <Typography className="dark:text-darkText text-whiteText font-semibold">
            Back
          </Typography>
        </Box>
        <Box className="flex flex-col w-full  md:flex-col lg:flex-row md:items-center md:justify-center lg:justify-start lg:items-start">
          <Box className="relative w-full md:w-[30%]">
            <DropZone
              handleFileDrop={handleFileDrop}
              previewUrl={previewUrl}
              handleRemove={() => {
                setPreviewUrl("");
                setShowEditButtonBox(true);
                delete doctor.avatarUrl;
              }}
            />
          </Box>

          <BasicDoctorInfo
            basicDoctorInfo={doctor}
            setBasicDoctorInfo={setDoctor}
            setShowEditBox={setShowEditButtonBox}
            edit={true}
          />
        </Box>

        <DetailEditCancelButton
          show={showEditButtonBox}
          handleCancel={() => {
            setPreviewUrl(data.avatarUrl);
            const doctordata = { ...data, mobile: data.mobile.substring(4) };
            delete doctordata.avatarUrl;
            setDoctor(doctordata);
            setShowEditButtonBox(false);
          }}
          handleUpdate={handleUpdate}
          loading={detailMutating}
        />

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
                  console.log("ERR", error);
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
                    end: calculateMinutes(
                      value,
                      Number(selectedSchedule.endDay)
                    ),
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
                    return toast.error(
                      "Start time must be less than end time."
                    );
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
        <Typography
          className="text-slate-500 dark:text-darkText underline ml-2 lg:ml-40 mt-10"
          onClick={() => {
            setOpenDeleteDoctorDialog(true);
          }}
        >
          Delete Doctor?
        </Typography>

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
        <DeleteDoctorDialog
          open={openDeleteDoctorDialog}
          handleClose={() => {
            setOpenDeleteDoctorDialog(false);
          }}
          handleDelete={async () => {
            try {
              const data = await triggerDeleteDoctor();
              if (data) {
                toast.success("Successfully deleted.");
                setOpenDeleteDoctorDialog(false);
                router.push("/backoffice/doctors");
              }
            } catch (error) {
              toast.error("Something went wrong.");
            }
          }}
          loading={deleteDoctorMutating}
        />
      </Box>
    </section>
  );
};

export default EditDoctorPage;
