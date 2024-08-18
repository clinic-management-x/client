"use state";
import CustomTextField from "@/components/input/CustomTextField/page";
import CustomDatePicker from "@/components/selectors/CustomDatePicker/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  Box,
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
  edit: boolean;
  basicStaffInfo: StaffType;
  setBasicStaffInfo: (data: StaffType) => void;
  setShowEditBox?: (data: boolean) => void;
}

const BasicInfo = ({
  edit,
  basicStaffInfo,
  setBasicStaffInfo,
  setShowEditBox,
}: Props) => {
  const [dob, setDob] = useState<Dayjs | null>(dayjs());
  return (
    <Box
      className={`w-full  ${
        edit ? "md:w-[100%] md:mt-0 lg:mt-2 lg:w-[70%] mt-0" : "md:w-[70%] mt-4"
      } mr-2`}
    >
      <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
        <div className="flex flex-col mx-2">
          <LabelTypography title=" Name" />
          <CustomTextField
            value={basicStaffInfo.name}
            handleChange={(e) => {
              setBasicStaffInfo({
                ...basicStaffInfo,
                name: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Date of Birth" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomDatePicker
              value={dob}
              handleChange={(newValue: Dayjs | null) => {
                setDob(newValue);
                setBasicStaffInfo({
                  ...basicStaffInfo,
                  dateOfBirth: newValue?.toISOString() as string,
                });
                setShowEditBox && setShowEditBox(true);
              }}
            />
          </LocalizationProvider>
        </div>
      </Box>
      <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
        <FormControl id="demo-row-radio-buttons-group-label" className="mx-2">
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
                    checked={data.id === basicStaffInfo.gender}
                    className="dark:text-[#D1D5DB]"
                    onChange={() => {
                      setBasicStaffInfo({
                        ...basicStaffInfo,
                        gender: data.id,
                      });
                      setShowEditBox && setShowEditBox(true);
                    }}
                  />
                }
                label={data.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <div className="flex flex-col mx-2">
          <LabelTypography title="Address" />
          <CustomTextField
            value={basicStaffInfo.address || ""}
            handleChange={(e) => {
              setBasicStaffInfo({
                ...basicStaffInfo,
                address: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
      </Box>
      <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
        <div className="flex flex-col mx-2">
          <LabelTypography title=" Phone Number" />
          <CustomTextField
            value={basicStaffInfo.mobile}
            type="mobile"
            handleChange={(e) => {
              setBasicStaffInfo({
                ...basicStaffInfo,
                mobile: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Email" />
          <CustomTextField
            value={basicStaffInfo.email}
            handleChange={(e) => {
              setBasicStaffInfo({
                ...basicStaffInfo,
                email: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default BasicInfo;
