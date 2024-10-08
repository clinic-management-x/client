import CustomTextField from "@/components/input/CustomTextField/page";
import CustomDatePicker from "@/components/selectors/CustomDatePicker/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
}

const BasicInfo = ({ basicPatientInfo, setBasicPatientInfo }: Props) => {
  const [dob, setDob] = useState<Dayjs | null>(dayjs());
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col mx-2 w-[30%]">
        <LabelTypography title=" Name" />
        <CustomTextField
          value={basicPatientInfo.name}
          handleChange={(e) => {
            setBasicPatientInfo({
              ...basicPatientInfo,
              name: e.target.value,
            });
            // setShowEditBox && setShowEditBox(true);
          }}
        />
      </div>
      <div className="flex flex-col mx-2 w-[30%]">
        <LabelTypography title="Age" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomDatePicker
            value={dob}
            handleChange={(newValue: Dayjs | null) => {
              setDob(newValue);
              setBasicPatientInfo({
                ...basicPatientInfo,
                dateOfBirth: newValue?.toISOString() as string,
              });
              // setShowEditBox && setShowEditBox(true);
            }}
          />
        </LocalizationProvider>
      </div>
      <FormControl
        id="demo-row-radio-buttons-group-label"
        className="mx-2 w-[30%]"
      >
        <LabelTypography title="Gender" />
        <RadioGroup
          row
          className="border-[1px] w-full rounded-md border-[#9CA3AF] h-[55px]  flex items-center justify-start pl-4 md:pl-1 md:justify-center"
        >
          {[
            { id: "M", label: "M" },
            { id: "F", label: "F" },
          ].map((data) => (
            <FormControlLabel
              key={data.id}
              value={data.id}
              className="dark:text-[#D1D5DB] text-whiteText"
              control={
                <Radio
                  checked={data.id === basicPatientInfo.gender}
                  className="dark:text-[#D1D5DB]"
                  onChange={() => {
                    setBasicPatientInfo({
                      ...basicPatientInfo,
                      gender: data.id,
                    });
                    //setShowEditBox && setShowEditBox(true);
                  }}
                />
              }
              label={data.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default BasicInfo;
