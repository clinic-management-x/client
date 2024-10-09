"use client";
import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import { defaultPatientData } from "@/utils/staticData";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
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

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${patientsEndPoint}`,
    createPatient
  );

  const closeDialog = () => {
    setBasicPatientInfo(defaultPatientData);
    handleClose();
  };
  const handleCreate = async () => {
    try {
      const data = await trigger(basicPatientInfo);
      if (data) {
        mutate();
        toast.success("Successfully created.");
        closeDialog();
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
            edit={false}
          />
          <AddressData
            basicPatientInfo={basicPatientInfo}
            setBasicPatientInfo={setBasicPatientInfo}
            edit={false}
          />
          <DetailInfo
            basicPatientInfo={basicPatientInfo}
            setBasicPatientInfo={setBasicPatientInfo}
            edit={false}
          />
          <PatientContacts
            basicPatientInfo={basicPatientInfo}
            setBasicPatientInfo={setBasicPatientInfo}
            edit={false}
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
