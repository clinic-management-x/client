import AddButton from "@/components/buttons/AddButton/page";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import BasicSupplierInfo from "@/components/dialogs/suppliers/BasicInfo/page";
import ContactCreate from "@/components/dialogs/suppliers/ContactCreate/page";
import ContactDisplay from "@/components/dialogs/suppliers/ContactDispaly/page";
import DropZone from "@/components/fileupload/DropZone/page";
import { uploadFile } from "@/datafetch/fileupload/upload.api";
import { editSupplier } from "@/datafetch/supplier/supplier.api";
import config from "@/utils/config";
import { supplierEndPoint } from "@/utils/endpoints";
import { defaultSupplierInfo } from "@/utils/staticData";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

interface ContactType {
  name?: string;
  value: string;
}

interface Props {
  id: string;
  data: SupplierType;
  mutate: any;
}

const SupplierMain = ({ id, data, mutate }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [showEditButtonBox, setShowEditButtonBox] = useState(false);
  const [supplier, setSupplier] = useState<SupplierType>(defaultSupplierInfo);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [contactData, setContactData] = useState("");
  const [showContactSelector, setShowContactSelector] = useState(false);
  const [showEditContactBox, setShowContactEditBox] = useState(false);

  const { trigger, isMutating: detailMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${supplierEndPoint}/${id}`,
    editSupplier
  );

  useEffect(() => {
    if (data && !showEditContactBox && !showEditButtonBox) {
      setPreviewUrl(data.avatarUrl || "");
      setSupplier({
        name: data.name,
        email: data.email,
        mobile: data.mobile.substring(4),
        address: data.address,
      });
      setContacts(data.contacts || []);
    }
  }, [data]);

  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "SUPPLIER_AVATAR");

    const filedata = await uploadFile(formData);
    setShowEditButtonBox(true);
    setPreviewUrl(filedata.presignedUrl);
    setSupplier({ ...supplier, avatarUrl: filedata.url });
  };

  const updateSupplier = async (data: EditSupplierType) => {
    try {
      const response = await trigger(
        data.mobile ? { ...data, mobile: `+959` + data.mobile } : data
      );

      if (response) {
        mutate();
        toast.success("Successfully added.");
        setShowEditButtonBox(false);
        setShowContactEditBox(false);
        setSupplier({ ...response, mobile: response?.mobile?.substring(4) });
        setContacts(response?.contacts);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <Box className="flex flex-col w-full  md:flex-col lg:flex-row md:items-center md:justify-center lg:justify-start lg:items-start">
        <Box className="relative w-full md:w-[30%]">
          <DropZone
            handleFileDrop={handleFileDrop}
            previewUrl={previewUrl}
            handleRemove={() => {
              setPreviewUrl("");
              setShowEditButtonBox(true);
              setSupplier({ ...supplier, avatarUrl: "" });
            }}
          />
        </Box>

        <BasicSupplierInfo
          basicSupplierInfo={supplier}
          setBasicSupplierInfo={setSupplier}
          setShowEditBox={setShowEditButtonBox}
          edit={true}
        />
      </Box>
      <div className="mt-4">
        <DetailEditCancelButton
          show={showEditButtonBox}
          handleCancel={() => {
            data.avatarUrl ? setPreviewUrl(data.avatarUrl) : setPreviewUrl("");
            setShowEditButtonBox(false);
          }}
          handleUpdate={() => {
            updateSupplier(supplier);
          }}
          loading={detailMutating}
        />
      </div>
      <div className="lg:ml-12">
        <ContactDisplay
          contacts={contacts}
          setContacts={setContacts}
          edit={true}
          setShowContactEditBox={setShowContactEditBox}
        />
        {showContactSelector ? (
          <ContactCreate
            contacts={contacts}
            setContacts={setContacts}
            contactData={contactData}
            setContactData={setContactData}
            setSelectedContact={setSelectedContact}
            selectedContact={selectedContact}
            setShowContactSelector={setShowContactSelector}
            setShowContactEditBox={setShowContactEditBox}
          />
        ) : (
          <></>
        )}
        <DetailEditCancelButton
          show={showEditContactBox}
          handleCancel={() => {
            setContacts(data.contacts || []);
            setShowContactEditBox(false);
          }}
          handleUpdate={() => {
            updateSupplier({ contacts: contacts });
          }}
          loading={detailMutating}
        />
        <div
          className={`md:ml-4 mt-2 ${
            showContactSelector || showEditContactBox ? "hidden" : ""
          }`}
        >
          <AddButton
            handleClick={() => {
              if (contactData === "" && !selectedContact) {
                setShowContactSelector(true);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SupplierMain;
