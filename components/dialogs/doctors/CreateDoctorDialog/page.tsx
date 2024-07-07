import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useCallback, useState } from "react";
import DropZone from "@/components/fileupload/DropZone/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import CloseButton from "@/components/buttons/CloseButton/page";
import AddButton from "@/components/buttons/AddButton/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import { createDoctor, getSpecialities } from "@/datafetch/doctors/doctors.api";
import { Dayjs } from "dayjs";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import toast from "react-hot-toast";
import BasicDoctorInfo from "../BasicInfo/page";
import { calculateMinutes } from "@/utils/calculations";
import { sortSchedules } from "@/utils/sorting";
import CreateScheduleDialog from "../CreateScheduleDialog/page";
import ScheduleListItem from "../ScheduleListItem/ScheduleListItem";
import { defaultInfo, defaultNewSchedule } from "@/utils/staticData";
import { areSchedulesOverlapping } from "@/utils/schedule";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateDoctorDialog = ({ open, handleClose }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [basicDoctorInfo, setBasicDoctorInfo] =
    useState<DoctorType>(defaultInfo);
  const [newSchedule, setNewSchedule] =
    useState<ScheduleType>(defaultNewSchedule);
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const handleFileDrop = useCallback(async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DOCTOR_AVATAR");
    const data = await uploadFile(formData);
    setPreviewUrl(data.presignedUrl);
    setBasicDoctorInfo({ ...basicDoctorInfo, avatarUrl: data.url });
  }, []);

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${doctorEndPoint}`,
    createDoctor
  );

  const handleCreate = async () => {
    try {
      const schedulesArr = schedules?.map((data) => {
        return {
          start: data.start,
          end: data.end,
        };
      });

      const doctorData = {
        ...basicDoctorInfo,
        mobile: "+959" + basicDoctorInfo.mobile,
        speciality: basicDoctorInfo.speciality._id,
        schedules: schedulesArr,
      };
      const response = await trigger(doctorData);
      if (response) {
        toast.success("Successfully added.");
        setPreviewUrl("");
        setBasicDoctorInfo(defaultInfo);
        setSchedules([]);
        handleClose();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  const clearScheduleData = () => {
    setStartTime(null);
    setEndTime(null);
    setNewSchedule(defaultNewSchedule);
    setShowTimeSelector(false);
  };
  const closeDialog = () => {
    setBasicDoctorInfo(defaultInfo);
    setSchedules([]);
    handleClose();
    setPreviewUrl("");
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="paper"
      open={open}
      onClose={closeDialog}
    >
      <DialogContent
        dividers={true}
        className="flex flex-col dark:bg-[#3C3C3C]"
      >
        <Box className="flex flex-col md:flex-row">
          <CloseButton handleClose={closeDialog} />
          <Box className="relative w-full md:w-[30%] mt-4">
            <DropZone
              handleFileDrop={handleFileDrop}
              previewUrl={previewUrl}
              handleRemove={() => {
                setPreviewUrl("");
                setBasicDoctorInfo({ ...basicDoctorInfo, avatarUrl: "" });
              }}
            />
          </Box>

          <BasicDoctorInfo
            basicDoctorInfo={basicDoctorInfo}
            setBasicDoctorInfo={setBasicDoctorInfo}
          />
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
                setBasicDoctorInfo({
                  ...basicDoctorInfo,
                  schedules: newArr,
                });
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
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={
              basicDoctorInfo.name === "" ||
              basicDoctorInfo.mobile.length < 9 ||
              basicDoctorInfo.speciality._id == ""
            }
            isLoading={createMutating}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDoctorDialog;
