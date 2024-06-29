import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import DropZone from "@/components/fileupload/DropZone/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import CustomTimePicker from "@/components/selectors/CustomTimePicker/page";
import CloseButton from "@/components/buttons/CloseButton/page";
import CheckButton from "@/components/buttons/CheckButton/page";
import CrossButton from "@/components/buttons/CrossButton/page";
import TrashButton from "@/components/buttons/TrashButton/page";
import AddButton from "@/components/buttons/AddButton/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import { createDoctor, getSpecialities } from "@/datafetch/doctors/doctors.api";
import dayjs, { Dayjs } from "dayjs";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import toast from "react-hot-toast";
import BasicDoctorInfo from "../BasicInfo/page";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const days = [
  { name: "Monday", id: 0 },
  { name: "Tuesday", id: 1 },
  { name: "Wednesday", id: 2 },
  { name: "Thursday", id: 3 },
  { name: "Friday", id: 4 },
  { name: "Saturday", id: 5 },
  { name: "Sunday", id: 6 },
];
const defaultInfo = {
  name: "",
  dateOfBirth: dayjs().toISOString(),
  gender: "M",
  speciality: {
    name: "",
    _id: "",
  },
  mobile: "",
  doctorFee: 0,
  email: "",
  avatarUrl: "",
};

const CreateDoctorDialog = ({ open, handleClose }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [basicDoctorInfo, setBasicDoctorInfo] = useState(defaultInfo);

  const handleFileDrop = useCallback(async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DOCTOR_AVATAR");
    const data = await uploadFile(formData);
    setPreviewUrl(data.presignedUrl);
    setBasicDoctorInfo({ ...basicDoctorInfo, avatarUrl: data.url });
  }, []);

  const { trigger } = useSWRMutation(
    `${config.apiBaseUrl}/${doctorEndPoint}`,
    createDoctor
  );

  const handleCreate = async () => {
    try {
      const response = await trigger({
        ...basicDoctorInfo,
        mobile: "+959" + basicDoctorInfo.mobile,
        speciality: basicDoctorInfo.speciality._id,
      });
      if (response) {
        toast.success("Successfully added.");
        setPreviewUrl("");
        setBasicDoctorInfo(defaultInfo);
        handleClose();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="paper"
      open={open}
      onClose={handleClose}
    >
      <DialogContent
        dividers={true}
        className="flex flex-col dark:bg-[#3C3C3C]"
      >
        <Box className="flex flex-col md:flex-row">
          <CloseButton
            handleClose={() => {
              setBasicDoctorInfo(defaultInfo);
              handleClose();
            }}
          />
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
            <Box className="relative w-full md:w-[80%] border-[1px] mb-1 flex flex-col  justify-around p-2 md:p-4 md:ml-4 dark:bg-[#3C3C3C] dark:border-gray-400 bg-stone-100 rounded-lg border-gray-300">
              <Box className="flex flex-col md:flex-row md:justify-between w-full">
                <Box className="flex flex-col space-y-2">
                  <PlainSelector
                    selectedValue={""}
                    handleChange={() => {}}
                    dataArr={days}
                    title="Start Day"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomTimePicker />
                  </LocalizationProvider>
                </Box>
                <Box className="flex items-center justify-center my-2 md:my-0 dark:text-gray-400 text-gray-500">
                  To
                </Box>
                <Box className="flex flex-col space-y-2">
                  <PlainSelector
                    selectedValue={""}
                    handleChange={() => {}}
                    dataArr={days}
                    title="End Day"
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomTimePicker />
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box className="flex items-center justify-center mt-2  space-x-2">
                <CrossButton
                  handleClick={() => {
                    setShowTimeSelector(false);
                  }}
                />
                <CheckButton handleClick={() => {}} />
              </Box>
            </Box>
          ) : (
            <></>
          )}

          <Box className="mt-2 w-full md:w-[80%] relative h-auto md:h-[50px] md:p-7 md:ml-4 bg-stone-100 dark:bg-[#3C3C3C] dark:border-gray-400 border-[1px] rounded-lg border-gray-300 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <Typography className="font-bold text-gray-500 dark:text-gray-400">
              Tuesday, 5pm
            </Typography>
            <Typography className="text-[15px text-gray-500 dark:text-gray-400">
              To
            </Typography>
            <Typography className="font-bold text-gray-500 dark:text-gray-400">
              Tuesday, 5pm
            </Typography>

            <Box className=" flex items-center absolute  bottom-0 right-0 md:bottom-0 md:right-0 md:relative">
              <TrashButton handleClick={() => {}} />
            </Box>
          </Box>
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
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDoctorDialog;
