import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
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

interface Props {
  medRepresentatives: MedicalRepresentativeType[];
  setMedRepresentatives: (data: MedicalRepresentativeType[]) => void;
  medRepresentative: MedicalRepresentativeType;
  setMedRepresentative: (data: MedicalRepresentativeType) => void;
  setShowMR: (data: boolean) => void;
  edit: boolean;
  id?: string;
}

const MRCreate = ({
  medRepresentatives,
  setMedRepresentatives,
  medRepresentative,
  setMedRepresentative,
  setShowMR,
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

  return (
    <div className="mt-4 ">
      <div className=" md:w-[90%] md:ml-4 grid grid-cols-1 md:grid-cols-3">
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
      </div>
      <div className="flex justify-center mt-4">
        <CrossCheckButtonsGroup
          handleCancel={() => {
            setMedRepresentative(defaultMRInfo);
            setContactData("");
            setSelectedContact(null);
            setContacts([]);
            setShowContactSelector(false);
            setShowMR(false);
          }}
          handleAdd={async () => {
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
          isLoading={detailMutating}
        />
      </div>
    </div>
  );
};

export default MRCreate;
