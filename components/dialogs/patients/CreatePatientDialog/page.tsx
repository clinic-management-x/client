"use client";
import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import CustomDatePicker from "@/components/selectors/CustomDatePicker/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { defaultPatientData } from "@/utils/staticData";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import AddressData from "../Address/page";
import PatientContacts from "../Contacts/page";
import BasicInfo from "../BasicInfo/page";
import DetailInfo from "../Detail/page";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { patientsEndPoint } from "@/utils/endpoints";
import { createPatient } from "@/datafetch/patients/patients.api";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: any;
}

const CreatePatientDialog = ({ open, handleClose, mutate }: Props) => {
  const [basicPatientInfo, setBasicPatientInfo] =
    useState<PatientType>(defaultPatientData);
  const [dob, setDob] = useState<Dayjs | null>(dayjs());

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${patientsEndPoint}`,
    createPatient
  );

  const closeDialog = () => {
    handleClose();
  };
  const handleCreate = async () => {
    try {
      delete basicPatientInfo.qrCodeUrl;
      const data = await trigger(basicPatientInfo);
      if (data) {
        toast.success("Successfully created.");
        handleClose();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
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
        <Box className="flex flex-col">
          <CloseButton handleClose={closeDialog} />
          <BasicInfo
            basicPatientInfo={basicPatientInfo}
            setBasicPatientInfo={setBasicPatientInfo}
          />
          <AddressData
            basicPatientInfo={basicPatientInfo}
            setBasicPatientInfo={setBasicPatientInfo}
          />
          <DetailInfo
            basicPatientInfo={basicPatientInfo}
            setBasicPatientInfo={setBasicPatientInfo}
          />
          <PatientContacts
            basicPatientInfo={basicPatientInfo}
            setBasicPatientInfo={setBasicPatientInfo}
          />
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={createMutating}
            isLoading={createMutating}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePatientDialog;
