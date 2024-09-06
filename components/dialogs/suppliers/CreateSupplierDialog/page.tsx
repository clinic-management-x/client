"use client";

import CloseButton from "@/components/buttons/CloseButton/page";
import DropZone from "@/components/fileupload/DropZone/page";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import { defaultMRInfo, defaultSupplierInfo } from "@/utils/staticData";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BasicSupplierInfo from "../BasicInfo/page";
import ContactDisplay from "../ContactDispaly/page";
import ContactCreate from "../ContactCreate/page";
import MRCreate from "../MRCreate/page";
import MRDisplay from "../MRDisplay/page";
import AddButton from "@/components/buttons/AddButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import useSWRMutation from "swr/mutation";
import { supplierEndPoint } from "@/utils/endpoints";
import config from "@/utils/config";
import { createSupplier } from "@/datafetch/supplier/supplier.api";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: any;
}

const CreateSupplierDialog = ({ open, handleClose, mutate }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [basicSupplierInfo, setBasicSupplierInfo] =
    useState<SupplierType>(defaultSupplierInfo);
  const [contacts, setContacts] = useState<{ name?: string; value: string }[]>(
    []
  );
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [contactData, setContactData] = useState("");
  const [showContactSelector, setShowContactSelector] = useState(false);
  const [showMRs, setShowMRs] = useState(false);
  const [medRepresentative, setMedRepresentative] =
    useState<MedicalRepresentativeType | null>(defaultMRInfo);
  const [medicalRepresentatives, setMedicalRepresentatives] = useState<
    MedicalRepresentativeType[]
  >([]);

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${supplierEndPoint}`,
    createSupplier
  );

  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "SUPPLIER_AVATAR");
    const data = await uploadFile(formData);
    setPreviewUrl(data.presignedUrl);
    setBasicSupplierInfo({ ...basicSupplierInfo, avatarUrl: data.url });
  };
  const closeDialog = () => {
    setPreviewUrl("");
    setBasicSupplierInfo(defaultSupplierInfo);
    setMedicalRepresentatives([]);
    setContactData("");
    setContacts([]);
    setSelectedContact(null);
    handleClose();
  };

  const handleCreate = async () => {
    try {
      basicSupplierInfo.mobile = `+959` + basicSupplierInfo.mobile;
      if (contacts) {
        basicSupplierInfo.contacts = contacts;
      }
      const payload = {
        company: basicSupplierInfo,
        representatives: medicalRepresentatives.map((data) => {
          delete data._id;
          return data;
        }),
      };
      const response = await trigger(payload);
      if (response) {
        mutate();
        toast.success("Successfully created.");
        closeDialog();
      } else {
        toast.error("Something went wrong.");
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
        <Box className="flex flex-col md:flex-row">
          <CloseButton handleClose={closeDialog} />
          <Box className="relative w-full md:w-[30%] mt-4">
            <DropZone
              handleFileDrop={handleFileDrop}
              previewUrl={previewUrl}
              handleRemove={() => {
                setPreviewUrl("");
                setBasicSupplierInfo({ ...basicSupplierInfo, avatarUrl: "" });
              }}
            />
          </Box>
          <BasicSupplierInfo
            basicSupplierInfo={basicSupplierInfo}
            setBasicSupplierInfo={setBasicSupplierInfo}
          />
        </Box>

        <ContactDisplay contacts={contacts} setContacts={setContacts} />
        {showContactSelector ? (
          <ContactCreate
            contacts={contacts}
            setContacts={setContacts}
            contactData={contactData}
            setContactData={setContactData}
            setSelectedContact={setSelectedContact}
            selectedContact={selectedContact}
            setShowContactSelector={setShowContactSelector}
          />
        ) : (
          <></>
        )}
        <div className={`md:ml-4 mt-2 ${showContactSelector ? "hidden" : ""}`}>
          <AddButton
            handleClick={() => {
              if (contactData === "" && !selectedContact) {
                setShowContactSelector(true);
              }
            }}
          />
        </div>
        <div className="mt-6"></div>
        <MRDisplay
          medRepresentatives={medicalRepresentatives}
          setMedRepresentatives={setMedicalRepresentatives}
        />
        {showMRs ? (
          <MRCreate
            medRepresentatives={medicalRepresentatives}
            setMedRepresentatives={setMedicalRepresentatives}
            medRepresentative={medRepresentative as MedicalRepresentativeType}
            setMedRepresentative={setMedRepresentative}
            setShowMR={setShowMRs}
            edit={false}
          />
        ) : (
          <></>
        )}
        <div className={`md:ml-4 mt-2 ${showMRs ? "hidden" : ""}`}>
          <AddButton
            handleClick={() => {
              if (
                medRepresentative?.name === "" &&
                medRepresentative?.mobile === ""
              ) {
                setShowMRs(true);
              }
            }}
          />
        </div>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={
              basicSupplierInfo.name === "" ||
              basicSupplierInfo.mobile.length < 9
            }
            isLoading={createMutating}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSupplierDialog;
