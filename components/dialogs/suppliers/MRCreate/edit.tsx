import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { defaultMRInfo } from "@/utils/staticData";
import React, { useState } from "react";
import ContactDisplay from "../ContactDispaly/page";
import ContactCreate from "../ContactCreate/page";
import AddButton from "@/components/buttons/AddButton/page";
import useSWRMutation from "swr/mutation";
import { supplierEndPoint } from "@/utils/endpoints";
import config from "@/utils/config";
import { createMR } from "@/datafetch/supplier/supplier.api";
import toast from "react-hot-toast";
import { Dialog, Typography } from "@mui/material";
import CloseButton from "@/components/buttons/CloseButton/page";
import PrimaryButton from "@/components/buttons/PrimaryButton";

interface Props {
  medRepresentatives: MedicalRepresentativeType[];
  setMedRepresentatives: (data: MedicalRepresentativeType[]) => void;
  medRepresentative: MedicalRepresentativeType;
  setMedRepresentative: (data: MedicalRepresentativeType) => void;
  setShowMR: (data: boolean) => void;
  edit: boolean;
  showMRs: boolean;
  id?: string;
}

const MRCreateDialog = ({
  medRepresentatives,
  setMedRepresentatives,
  medRepresentative,
  setMedRepresentative,
  setShowMR,
  showMRs,
  edit,
  id,
}: Props) => {
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [contactData, setContactData] = useState("");
  const [showContactSelector, setShowContactSelector] = useState(false);
  const [contacts, setContacts] = useState<{ name?: string; value: string }[]>(
    []
  );
  const { trigger, isMutating: detailMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${supplierEndPoint}/mr`,
    createMR
  );

  const closeDialog = () => {
    setMedRepresentative(defaultMRInfo);
    setContactData("");
    setSelectedContact(null);
    setContacts([]);
    setShowContactSelector(false);
    setShowMR(false);
  };

  return (
    <Dialog open={showMRs} onClose={closeDialog} maxWidth="sm" fullWidth>
      <div className="flex flex-col mx-6 mb-6">
        <CloseButton handleClose={closeDialog} />
        <Typography
          variant="h6"
          className="font-semibold mb-2 mt-6 mx-2 text-whiteText dark:text-darkText"
        >
          Create Medical Representative
        </Typography>

        <div className="flex flex-col mx-2">
          <LabelTypography title="Name" />
          <CustomTextField
            value={medRepresentative.name}
            handleChange={(e) => {
              setMedRepresentative({
                ...medRepresentative,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col mx-2">
          <LabelTypography title=" Phone Number" />
          <CustomTextField
            value={medRepresentative.mobile}
            type="mobile"
            handleChange={(e) => {
              setMedRepresentative({
                ...medRepresentative,
                mobile: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Email" />
          <CustomTextField
            value={medRepresentative.email}
            handleChange={(e) => {
              setMedRepresentative({
                ...medRepresentative,
                email: e.target.value,
              });
            }}
          />
        </div>

        <div className="mt-2 md:mt-6">
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
              mr={true}
            />
          ) : (
            <></>
          )}
          <div
            className={`md:ml-4 mt-2 ${showContactSelector ? "hidden" : ""}`}
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

        <PrimaryButton
          text="Create"
          loading={detailMutating}
          disabled={
            medRepresentative.name === "" || medRepresentative.mobile === ""
          }
          onClick={async () => {
            const newMr = contacts.length
              ? {
                  ...medRepresentative,
                  contacts: contacts,
                  _id: `${contacts.length + 1}`,
                  mobile: `+959` + medRepresentative.mobile,
                }
              : {
                  ...medRepresentative,
                  _id: `${contacts.length + 1}`,
                  mobile: `+959` + medRepresentative.mobile,
                };
            if (edit) {
              try {
                const response = await trigger({
                  mr: contacts.length
                    ? {
                        ...medRepresentative,
                        contacts: contacts,
                        mobile: `+959` + medRepresentative.mobile,
                      }
                    : {
                        ...medRepresentative,
                        mobile: `+959` + medRepresentative.mobile,
                      },
                  _id: id ? id : "",
                });
                if (response) {
                  toast.success("Successfully added.");
                  setMedRepresentatives(response.medRepresentatives);
                  setMedRepresentative(defaultMRInfo);
                }
              } catch (error) {
                toast.error("Something went wrong.");
              }
            } else {
              setMedRepresentatives([...medRepresentatives, newMr]);
              setMedRepresentative(defaultMRInfo);
            }

            setShowMR(false);
          }}
          className="mt-4 m-auto "
        />
      </div>
    </Dialog>
  );
};

export default MRCreateDialog;
