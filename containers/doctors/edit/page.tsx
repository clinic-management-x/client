"use client";
import _ from "lodash";
import BasicDoctorInfo from "@/components/dialogs/doctors/BasicInfo/page";
import DropZone from "@/components/fileupload/DropZone/page";
import {
  deleteDoctor,
  getDoctor,
  updateDoctor,
} from "@/datafetch/doctors/doctors.api";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import { defaultInfo } from "@/utils/staticData";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR, { KeyedMutator } from "swr";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import BackButton from "@/components/buttons/BackButton/page";
import Schedules from "./schedules";
import SkeletonPage from "./skeleton";
import DeleteMajorInfo from "@/components/dialogs/delete/DeleteMajorInfo";

const EditDoctorPage = ({ id }: { id: string }) => {
  const router = useRouter();

  const [doctor, setDoctor] = useState<DoctorType>(defaultInfo);
  const [previewUrl, setPreviewUrl] = useState("");
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [showEditButtonBox, setShowEditButtonBox] = useState(false);
  const [openDeleteDoctorDialog, setOpenDeleteDoctorDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}`,
    getDoctor
  );

  const { trigger, isMutating: detailMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${doctorEndPoint}/${id}/details`,
    updateDoctor
  );

  const addBasicInfo = () => {
    const doctordata = { ...data, mobile: data.mobile.substring(4) };
    delete doctordata.avatarUrl;
    setDoctor(doctordata);
  };

  useEffect(() => {
    if (data) {
      data.avatarUrl && !showEditButtonBox
        ? setPreviewUrl(data.avatarUrl)
        : setPreviewUrl("");
      setSchedules(data.schedules);
      addBasicInfo();
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

  const handleUpdate = async () => {
    try {
      const response = await trigger(doctor);

      if (response) {
        mutate();
        toast.success("Successfully added.");
        setShowEditButtonBox(false);
        setDoctor({ ...response, mobile: data.mobile.substring("4") });
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
            router.push("/backoffice/doctors");
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

            <DetailEditCancelButton
              show={showEditButtonBox}
              handleCancel={() => {
                setPreviewUrl(data.avatarUrl);
                addBasicInfo();
                setShowEditButtonBox(false);
              }}
              handleUpdate={handleUpdate}
              loading={detailMutating}
            />
            <Schedules
              schedules={schedules}
              setSchedules={setSchedules}
              doctor={doctor}
              mutate={mutate}
            />

            <Typography
              className="text-slate-500 dark:text-darkText underline ml-2 lg:ml-20 mt-10"
              onClick={() => {
                setOpenDeleteDoctorDialog(true);
              }}
            >
              Delete Doctor?
            </Typography>
          </>
        )}
        <DeleteMajorInfo
          open={openDeleteDoctorDialog}
          handleClose={() => {
            setOpenDeleteDoctorDialog(false);
          }}
          handleDelete={() => async () => {
            try {
              setDeleteLoading(true);
              const data = await deleteDoctor(
                `${config.apiBaseUrl}/${doctorEndPoint}/${id}`
              );
              if (data) {
                setDeleteLoading(false);
                toast.success("Successfully deleted.");
                setOpenDeleteDoctorDialog(false);
                // mutateDoctors();
                router.push("/backoffice/doctors");
              }
            } catch (error) {
              setDeleteLoading(false);
              toast.error("Something went wrong.");
            }
          }}
          loading={deleteLoading}
          text1="Doctor"
          text2="Deleting the doctor will remove all of the doctor's information from
          our databse.This cannot be undone."
        />
      </Box>
    </section>
  );
};

export default EditDoctorPage;
