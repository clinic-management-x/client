"use client";
import _ from "lodash";
import AddButton from "@/components/buttons/AddButton/page";
import BasicDoctorInfo from "@/components/dialogs/doctors/BasicInfo/page";
import CreateScheduleDialog from "@/components/dialogs/doctors/CreateScheduleDialog/page";
import ScheduleListItem from "@/components/dialogs/doctors/ScheduleListItem/ScheduleListItem";
import DropZone from "@/components/fileupload/DropZone/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { getDoctor, updateDoctor } from "@/datafetch/doctors/doctors.api";
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
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { areSchedulesOverlapping } from "@/utils/schedule";

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
  const [dropNewUrl, setDropNewUrl] = useState(false);
  const { data, isLoading, isValidating, mutate } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}`,
    getDoctor
  );

  const { trigger } = useSWRMutation(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}/details`,
    updateDoctor
  );

  useEffect(() => {
    if (data) {
      const doctordata = { ...data, mobile: data.mobile.substring(4) };
      !dropNewUrl ? setPreviewUrl(data.avatarUrl) : "";
      setSchedules(data.schedules);
      delete doctordata.avatarUrl;
      setDoctor(doctordata);
    }
  }, [data]);

  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    setDropNewUrl(true);
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
        toast.success("Successfully added.");
        setShowEditButtonBox(false);
        setDoctor({ ...response, mobile: data.mobile.substring("4") });
        setPreviewUrl(response.avatarUrl);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col overflow-y-scroll">
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
      <Box className="flex flex-col md:flex-col lg:flex-row md:items-center md:justify-center lg:justify-start lg:items-start">
        <Box className="relative w-full md:w-[30%]">
          <DropZone
            handleFileDrop={handleFileDrop}
            previewUrl={previewUrl}
            handleRemove={() => {
              setPreviewUrl("");
              setShowEditButtonBox(true);
              setDoctor({ ...doctor, avatarUrl: "" });
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
      <Box
        className={`m-auto  space-x-2 ${showEditButtonBox ? "flex" : "hidden"}`}
      >
        <Button
          sx={{
            width: 100,
            bgcolor: "black",
            color: "white",
            ":hover": {
              bgcolor: "black",
              color: "white",
            },
          }}
          onClick={() => {
            setPreviewUrl(data.avatarUrl);
            const doctordata = { ...data, mobile: data.mobile.substring(4) };
            delete doctordata.avatarUrl;
            setDoctor(doctordata);
            setShowEditButtonBox(false);
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            width: 100,
            bgcolor: "#0F80AA",
            color: "white",
            ":hover": {
              bgcolor: "#0F80AA",
              color: "white",
            },
          }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
      <Box className="md:px-4 md:ml-4 flex flex-col">
        <LabelTypography title="Schedules" />
        <AddButton
          handleClick={() => {
            setShowTimeSelector(true);
          }}
        />

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
              if (areSchedulesOverlapping([...schedules, newSchedule])) {
                return toast.error("Schedules overlapped.");
              } else if (
                newSchedule.startDay === newSchedule.endDay &&
                newSchedule.start > newSchedule.end
              ) {
                return toast.error("Start time must be less than end time.");
              }
              const newArr = [
                ...schedules,
                { ...newSchedule, _id: schedules.length + 1 },
              ];
              setSchedules(newArr);

              clearScheduleData();
            }}
            handleClose={clearScheduleData}
          />
        ) : (
          <></>
        )}
        {showTimeSelector ? (
          <>
            <Box
              className={`m-auto  space-x-2 ${
                showEditButtonBox ? "flex" : "hidden"
              }`}
            >
              <Button
                sx={{
                  width: 100,
                  bgcolor: "black",
                  color: "white",
                  ":hover": {
                    bgcolor: "black",
                    color: "white",
                  },
                }}
                onClick={() => {
                  setPreviewUrl(data.avatarUrl);
                  const doctordata = {
                    ...data,
                    mobile: data.mobile.substring(4),
                  };
                  delete doctordata.avatarUrl;
                  setDoctor(doctordata);
                  setShowEditButtonBox(false);
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  width: 100,
                  bgcolor: "#0F80AA",
                  color: "white",
                  ":hover": {
                    bgcolor: "#0F80AA",
                    color: "white",
                  },
                }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
            <Divider />
          </>
        ) : (
          <></>
        )}
        {sortSchedules(schedules)?.map((schedule, index) =>
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
              handleCheck={() => {
                if (areSchedulesOverlapping([...schedules, selectedSchedule])) {
                  return toast.error("Schedules overlapped.");
                } else if (
                  selectedSchedule.startDay === selectedSchedule.endDay &&
                  selectedSchedule.start > selectedSchedule.end
                ) {
                  return toast.error("Start time must be less than end time.");
                }
                const newArr = schedules.map((sdata) => {
                  return sdata._id === selectedSchedule._id
                    ? selectedSchedule
                    : sdata;
                });
                setSchedules(newArr);
                setSelectedSchedule(null);
              }}
              handleClose={() => {
                setSelectedSchedule(null);
                setStartTime(null);
                setEndTime(null);
              }}
            />
          ) : (
            <ScheduleListItem
              key={index}
              handleRemove={() => {
                setSchedules(
                  schedules.filter((data) => data._id !== schedule._id)
                );
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
            />
          )
        )}
      </Box>
    </section>
  );
};

export default EditDoctorPage;
