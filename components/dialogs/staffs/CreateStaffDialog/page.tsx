"use client";
import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import DropZone from "@/components/fileupload/DropZone/page";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import { createStaff } from "@/datafetch/staffs/staffs.api";
import config from "@/utils/config";
import { staffEndPoint } from "@/utils/endpoints";
import { defaultStaffInfo } from "@/utils/staticData";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import BasicInfo from "../BasicInfo/page";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: any;
}

const CreateStaffDialog = ({ open, handleClose, mutate }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [basicStaffInfo, setBasicStaffInfo] =
    useState<StaffType>(defaultStaffInfo);

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${staffEndPoint}`,
    createStaff
  );

  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DOCTOR_AVATAR");
    const data = await uploadFile(formData);
    setPreviewUrl(data.presignedUrl);
    setBasicStaffInfo({ ...basicStaffInfo, avatarUrl: data.url });
  };

  const handleCreate = async () => {
    try {
      const staffData = {
        ...basicStaffInfo,
        mobile: "+959" + basicStaffInfo.mobile,
      };
      const response = await trigger(staffData);
      if (response) {
        mutate();
        toast.success("Successfully added.");
        setPreviewUrl("");
        setBasicStaffInfo(defaultStaffInfo);
        handleClose();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const closeDialog = () => {
    setBasicStaffInfo(defaultStaffInfo);
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
                setBasicStaffInfo({ ...basicStaffInfo, avatarUrl: "" });
              }}
            />
          </Box>
          <BasicInfo
            basicStaffInfo={basicStaffInfo}
            setBasicStaffInfo={setBasicStaffInfo}
            edit={false}
          />
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={
              basicStaffInfo.name === "" || basicStaffInfo.mobile.length < 9
            }
            isLoading={createMutating}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStaffDialog;
