"use client";
import { deletePatient, getPatient } from "@/datafetch/patients/patients.api";
import config from "@/utils/config";
import { patientsEndPoint } from "@/utils/endpoints";
import { defaultPatientData } from "@/utils/staticData";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import SkeletonFrame from "./skeleton";
import BackButton from "@/components/buttons/BackButton/page";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import PatientMetaData from "./patientMetaData";
import BasicInfo from "@/components/dialogs/patients/BasicInfo/page";
import AddressData from "@/components/dialogs/patients/Address/page";
import DetailInfo from "@/components/dialogs/patients/Detail/page";
import PatientContacts from "@/components/dialogs/patients/Contacts/page";
import DeleteMajorInfo from "@/components/dialogs/delete/DeleteMajorInfo";
import toast from "react-hot-toast";

const EditPatientPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const [patient, setPatient] = useState<PatientType>(defaultPatientData);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${patientsEndPoint}/${id}`,
    getPatient
  );

  useEffect(() => {
    if (data) {
      const info = {
        ...data,
        contacts: data.contacts.map((contact: any) =>
          contact.name == "mobile"
            ? { ...contact, value: contact.value.slice(4) }
            : contact
        ),
        emergencyMobileContact: data.emergencyMobileContact.slice(4),
      };
      setPatient(info);
    }
  }, [data]);

  return (
    <section className="flex flex-col">
      <Box sx={{ mb: 20 }}>
        <BackButton
          handleClick={() => {
            router.push("/backoffice/patients");
          }}
        />
        {isLoading ? (
          <SkeletonFrame />
        ) : (
          <div className="flex flex-col  md:mx-6  ">
            <PatientMetaData patient={patient} />
            <BasicInfo
              basicPatientInfo={patient}
              setBasicPatientInfo={setPatient}
              edit={true}
              mainData={data}
            />
            <AddressData
              basicPatientInfo={patient}
              setBasicPatientInfo={setPatient}
              edit={true}
              mainData={data}
            />
            <DetailInfo
              basicPatientInfo={patient}
              setBasicPatientInfo={setPatient}
              edit={true}
              mainData={data}
            />
            <PatientContacts
              basicPatientInfo={patient}
              setBasicPatientInfo={setPatient}
              edit={true}
              mainData={data}
            />
          </div>
        )}
        <Typography
          className="text-slate-500 dark:text-darkText underline ml-8  mt-10"
          onClick={() => {
            setOpenDeleteDialog(true);
          }}
        >
          Delete Patient?
        </Typography>
      </Box>
      <DeleteMajorInfo
        open={openDeleteDialog}
        handleClose={() => {
          setOpenDeleteDialog(false);
        }}
        handleDelete={async () => {
          try {
            setDeleteLoading(true);
            const data = await deletePatient(
              `${config.apiBaseUrl}/${patientsEndPoint}/${id}`
            );
            if (data) {
              setDeleteLoading(false);
              setOpenDeleteDialog(false);
              toast.success("Successfully deleted.");
              router.push("/backoffice/patients");
            }
          } catch (error) {
            setDeleteLoading(false);
            toast.error("Something went wrong");
          }
        }}
        loading={deleteLoading}
        text1="patient"
        text2="Deleting the patient will remove all of the patient's information from
          our databse.This cannot be undone."
      />
    </section>
  );
};

export default EditPatientPage;
