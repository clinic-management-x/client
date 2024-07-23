"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SkeletonPage from "./skeleton";
import BackButton from "@/components/buttons/BackButton/page";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import config from "@/utils/config";
import { staffEndPoint } from "@/utils/endpoints";
import {
  deleteStaff,
  getStaff,
  updateStaff,
} from "@/datafetch/staffs/staffs.api";
import useSWRMutation from "swr/mutation";
import DropZone from "@/components/fileupload/DropZone/page";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import { defaultStaffInfo } from "@/utils/staticData";
import toast from "react-hot-toast";
import BasicInfo from "@/components/dialogs/staffs/BasicInfo/page";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import DeleteStaffDialog from "@/components/dialogs/staffs/DeleteStaffDialog/page";
import { useSelector } from "react-redux";
import { getMutateStaffs } from "@/redux/slices/layout";

const EditStaffPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const mutateStaffs = useSelector(getMutateStaffs);
  const [staff, setStaff] = useState<StaffType>(defaultStaffInfo);
  const [showEditButtonBox, setShowEditButtonBox] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [openDeleteStaffDialog, setOpenDeleteStaffDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${staffEndPoint}/${id}`,
    getStaff
  );

  const { trigger, isMutating: detailMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${staffEndPoint}/${id}`,
    updateStaff
  );
  const addBasicInfo = () => {
    const staffdata = { ...data, mobile: data.mobile.substring(4) };
    delete staffdata.avatarUrl;
    setStaff(staffdata);
  };

  useEffect(() => {
    if (data) {
      data.avatarUrl && !showEditButtonBox
        ? setPreviewUrl(data.avatarUrl)
        : setPreviewUrl("");
      addBasicInfo();
    }
  }, data);
  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DOCTOR_AVATAR");

    const filedata = await uploadFile(formData);
    setShowEditButtonBox(true);
    setPreviewUrl(filedata.presignedUrl);
    setStaff({ ...staff, avatarUrl: filedata.url });
  };

  const handleUpdate = async () => {
    try {
      const response = await trigger(staff);

      if (response) {
        mutate();

        toast.success("Successfully added.");
        setShowEditButtonBox(false);
        setStaff({ ...response, mobile: data.mobile.substring("4") });
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col overflow-y-scroll ">
      <Box sx={{ mb: 50 }}>
        <BackButton
          handleClick={() => {
            mutateStaffs ? mutateStaffs() : "";
            router.push("/backoffice/staffs");
          }}
        />
        {isLoading ? (
          <SkeletonPage />
        ) : (
          <>
            <Box className="flex flex-col w-full  md:flex-col lg:flex-row md:items-center md:justify-center lg:justify-start lg:items-start">
              <Box className="relative w-full md:w-[30%]">
                <DropZone
                  handleFileDrop={handleFileDrop}
                  previewUrl={previewUrl}
                  handleRemove={() => {
                    setPreviewUrl("");
                    setShowEditButtonBox(true);
                    setStaff({ ...staff, avatarUrl: "" });
                  }}
                />
              </Box>

              <BasicInfo
                basicStaffInfo={staff}
                setBasicStaffInfo={setStaff}
                setShowEditBox={setShowEditButtonBox}
                edit={true}
              />
            </Box>

            <DetailEditCancelButton
              show={showEditButtonBox}
              handleCancel={() => {
                setPreviewUrl(data.avatarUrl);
                //addBasicInfo();
                setShowEditButtonBox(false);
              }}
              handleUpdate={handleUpdate}
              loading={detailMutating}
            />

            <Typography
              className="text-slate-500 dark:text-darkText underline ml-2 lg:ml-40 mt-10"
              onClick={() => {
                setOpenDeleteStaffDialog(true);
              }}
            >
              Delete Staff?
            </Typography>

            <DeleteStaffDialog
              open={openDeleteStaffDialog}
              handleClose={() => {
                setOpenDeleteStaffDialog(false);
              }}
              handleDelete={async () => {
                try {
                  setDeleteLoading(true);
                  const data = await deleteStaff(
                    `${config.apiBaseUrl}/${staffEndPoint}/${id}`
                  );
                  if (data) {
                    setDeleteLoading(false);
                    toast.success("Successfully deleted.");
                    setOpenDeleteStaffDialog(false);
                    // mutateDoctors();
                    router.push("/backoffice/staffs");
                  }
                } catch (error) {
                  setDeleteLoading(false);
                  toast.error("Something went wrong.");
                }
              }}
              loading={deleteLoading}
            />
          </>
        )}
      </Box>
    </section>
  );
};

export default EditStaffPage;
