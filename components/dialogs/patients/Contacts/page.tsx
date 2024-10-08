import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
}

const PatientContacts = ({ basicPatientInfo, setBasicPatientInfo }: Props) => {
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
              // setShowEditBox && setShowEditBox(true);
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
              // setShowEditBox && setShowEditBox(true);
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
              // setShowEditBox && setShowEditBox(true);
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
            // setShowEditBox && setShowEditBox(true);
          }}
        />
      </div>
    </div>
  );
};

export default PatientContacts;
