import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { updatePatient } from "@/datafetch/patients/patients.api";
import config from "@/utils/config";
import { patientsEndPoint } from "@/utils/endpoints";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
  edit: boolean;
  mainData?: PatientType;
}

const PatientContacts = ({
  basicPatientInfo,
  setBasicPatientInfo,
  edit,
  mainData,
}: Props) => {
  const theme = useTheme();
  const [showEditBox, setShowEditBox] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { trigger, isMutating: updateMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${patientsEndPoint}/${basicPatientInfo._id}`,
    updatePatient
  );

  return (
    <div>
      <div className="ml-2 mt-4">
        <LabelTypography title="Contacts" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col mx-2 w-[30%]">
          <LabelTypography title="Email" />
          <CustomTextField
            value={basicPatientInfo.contacts[0].value}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                contacts: basicPatientInfo.contacts.map((contact) =>
                  contact.name === "email"
                    ? { ...contact, value: e.target.value }
                    : contact
                ),
              });
              setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 w-[30%]">
          <LabelTypography title="Mobile" />
          <CustomTextField
            type="mobile"
            value={basicPatientInfo.contacts[1].value}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                contacts: basicPatientInfo.contacts.map((contact) =>
                  contact.name === "mobile"
                    ? { ...contact, value: e.target.value }
                    : contact
                ),
              });
              setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 w-[30%]">
          <LabelTypography title="Viber" />
          <CustomTextField
            value={basicPatientInfo.contacts[2].value}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                contacts: basicPatientInfo.contacts.map((contact) =>
                  contact.name === "viber"
                    ? { ...contact, value: e.target.value }
                    : contact
                ),
              });
              setShowEditBox(true);
            }}
          />
        </div>
      </div>
      <div className="ml-2 mt-4">
        <LabelTypography title="Preferred way to contact" />
      </div>
      <div className="mx-2">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: theme.theme === "dark" ? "#D1D5DB" : "" }}
                checked={basicPatientInfo.contacts[0].is_preferred_way}
                onChange={(e) => {
                  setBasicPatientInfo({
                    ...basicPatientInfo,
                    contacts: basicPatientInfo.contacts.map((contact) =>
                      contact.name === "email"
                        ? { ...contact, is_preferred_way: e.target.checked }
                        : contact
                    ),
                  });
                  setShowEditBox(true);
                }}
              />
            }
            label={
              <Typography
                variant="subtitle2"
                className="mt-1 text-whiteText dark:text-darkText"
              >
                Email
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: theme.theme === "dark" ? "#D1D5DB" : "" }}
                checked={basicPatientInfo.contacts[1].is_preferred_way}
                onChange={(e) => {
                  setBasicPatientInfo({
                    ...basicPatientInfo,
                    contacts: basicPatientInfo.contacts.map((contact) =>
                      contact.name === "mobile"
                        ? { ...contact, is_preferred_way: e.target.checked }
                        : contact
                    ),
                  });
                  setShowEditBox(true);
                }}
              />
            }
            label={
              <Typography
                variant="subtitle2"
                className="mt-1 text-whiteText dark:text-darkText"
              >
                Mobile & SMS
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: theme.theme === "dark" ? "#D1D5DB" : "" }}
                checked={basicPatientInfo.contacts[2].is_preferred_way}
                onChange={(e) => {
                  setBasicPatientInfo({
                    ...basicPatientInfo,
                    contacts: basicPatientInfo.contacts.map((contact) =>
                      contact.name === "viber"
                        ? { ...contact, is_preferred_way: e.target.checked }
                        : contact
                    ),
                  });
                  setShowEditBox(true);
                }}
              />
            }
            label={
              <Typography
                variant="subtitle2"
                className="mt-1 text-whiteText dark:text-darkText"
              >
                Viber
              </Typography>
            }
          />
        </FormGroup>
      </div>
      {edit && showEditBox ? (
        <div className="mt-4 w-full flex justify-center">
          <CrossCheckButtonsGroup
            isLoading={updateMutating}
            handleCancel={() => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                contacts:
                  mainData?.contacts.map((contact: any) =>
                    contact.name == "mobile"
                      ? { ...contact, value: contact.value.slice(4) }
                      : contact
                  ) || [],
              });
              setShowEditBox(false);
            }}
            handleAdd={async () => {
              try {
                const data = await trigger({
                  contacts: basicPatientInfo.contacts.map((contact: any) =>
                    contact.name == "mobile"
                      ? { ...contact, value: "+959" + contact.value }
                      : contact
                  ),
                });
                if (data) {
                  toast.success("Successfully updated.");
                  setShowEditBox(false);
                }
              } catch (error) {
                console.log("error", error);
                toast.error("Something went wrong.");
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col mx-2 w-[30%] mt-4">
        <LabelTypography title="Emergency Contact" />
        <CustomTextField
          type="mobile"
          value={basicPatientInfo.emergencyMobileContact}
          handleChange={(e) => {
            setBasicPatientInfo({
              ...basicPatientInfo,
              emergencyMobileContact: e.target.value,
            });
            setShowEdit(true);
          }}
        />
      </div>
      {edit && showEdit ? (
        <div className="mt-4 w-full flex justify-center">
          <CrossCheckButtonsGroup
            isLoading={updateMutating}
            handleCancel={() => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                emergencyMobileContact:
                  mainData?.emergencyMobileContact.slice(4) || "",
              });
              setShowEdit(false);
            }}
            handleAdd={async () => {
              try {
                const data = await trigger({
                  emergencyMobileContact:
                    "+959" + basicPatientInfo.emergencyMobileContact,
                });

                if (data) {
                  toast.success("Successfully updated.");
                  setShowEdit(false);
                }
              } catch (error) {
                console.log("error", error);
                toast.error("Something went wrong.");
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PatientContacts;
