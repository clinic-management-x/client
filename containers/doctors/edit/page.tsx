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
import { calculateMinutes } from "@/utils/calculations";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import { checkInvalidSchedule } from "@/utils/schedule";
import { sortSchedules } from "@/utils/sorting";
import { defaultInfo, defaultNewSchedule } from "@/utils/staticData";
import { Box, Button } from "@mui/material";
import { Dayjs } from "dayjs";
import { userAgent } from "next/server";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const EditDoctorPage = ({ id }: { id: string }) => {
  const [doctor, setDoctor] = useState<DoctorType>(defaultInfo);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [newSchedule, setNewSchedule] =
    useState<ScheduleType>(defaultNewSchedule);
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [showEditButtonBox, setShowEditButtonBox] = useState(false);
  const { data, isLoading, isValidating } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}`,
    getDoctor
  );

  const { trigger } = useSWRMutation(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}/details`,
    updateDoctor
  );

  useEffect(() => {
    if (data) {
      setDoctor({ ...data, mobile: data.mobile.substring("4") });
      setPreviewUrl(data.avatarUrl);
      setSchedules(data.schedules);
    }
  }, [data]);

  useEffect(() => {
    if (doctor && data) {
      setShowEditButtonBox(
        !_.isEqual(
          {
            ...doctor,
            mobile: "+959" + doctor.mobile,
          },
          data
        )
      );
    }
  }, [doctor]);

  const handleFileDrop = useCallback(async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DOCTOR_AVATAR");
    const data = await uploadFile(formData);
    setShowEditButtonBox(true);
    setPreviewUrl(data.presignedUrl);
    setDoctor({ ...doctor, avatarUrl: data.url });
  }, []);

  const clearScheduleData = () => {
    setStartTime(null);
    setEndTime(null);
    setNewSchedule(defaultNewSchedule);
    setShowTimeSelector(false);
  };

  const handleUpdate = async () => {
    try {
      const doctorData = {
        ...doctor,
        mobile: "+959" + doctor.mobile,
        speciality: doctor.speciality._id,
      };
      delete doctorData["schedules"];
      delete doctorData["_id"];
      delete doctorData["__v"];
      delete doctorData["avatarUrl"];
      delete doctorData["clinic"];
      const response = await trigger(doctorData);
      if (response) {
        toast.success("Successfully added.");
        setShowEditButtonBox(false);
        setDoctor(response);
        setPreviewUrl(response.avatarUrl);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box className="flex flex-col md:flex-row">
        <Box className="relative w-full md:w-[30%] mt-4">
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
        />
      </Box>
      <Box
        className={`m-auto mt-4 space-x-2 ${
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
            setShowEditButtonBox(false);
            setPreviewUrl(data.avatarUrl);
            setDoctor({ ...data, mobile: data.mobile.substring("4") });
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
                startTime: calculateMinutes(startTime, +e.target.value),
              });
            }}
            handleEndDayChange={(e) => {
              setNewSchedule({
                ...newSchedule,
                endDay: +e.target.value,
                endTime: calculateMinutes(endTime, +e.target.value),
              });
            }}
            handleStartTimeChange={(value) => {
              setNewSchedule({
                ...newSchedule,
                startTime: calculateMinutes(value, newSchedule.startDay),
              });
              setStartTime(value);
            }}
            handleEndTimeChange={(value) => {
              setNewSchedule({
                ...newSchedule,
                endTime: calculateMinutes(value, newSchedule.endDay),
              });
              setEndTime(value);
            }}
            handleCheck={() => {
              if (checkInvalidSchedule(newSchedule, schedules)) {
                return toast.error("Schedules overlapped.");
              } else if (
                newSchedule.startDay === newSchedule.endDay &&
                newSchedule.startTime > newSchedule.endTime
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
        {sortSchedules(schedules)?.map((schedule, index) => (
          <ScheduleListItem
            key={index}
            handleRemove={() => {
              setSchedules(
                schedules.filter((data) => data._id !== schedule._id)
              );
            }}
            schedule={schedule}
          />
        ))}
      </Box>
    </section>
  );
};

export default EditDoctorPage;
