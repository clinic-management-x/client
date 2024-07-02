import CustomTextField from "@/components/input/CustomTextField/page";
import CustomDatePicker from "@/components/selectors/CustomDatePicker/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { getSpecialities } from "@/datafetch/doctors/doctors.api";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
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
import useSWR from "swr";

interface Props {
  basicDoctorInfo: DoctorType;
  setBasicDoctorInfo: (data: DoctorType) => void;
  setShowEditBox?: (data: boolean) => void;
}

const BasicDoctorInfo = ({
  basicDoctorInfo,
  setBasicDoctorInfo,
  setShowEditBox,
}: Props) => {
  const { data: specialities } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}/specialities`,
    getSpecialities
  );
  const [dob, setDob] = useState<Dayjs | null>(dayjs());
  return (
    <Box className="w-full md:w-[70%] mr-2 mt-4">
      <Box className="  flex flex-col   md:grid md:grid-cols-3 gap-2">
        <div className="flex flex-col mx-2">
          <LabelTypography title=" Name" />
          <CustomTextField
            value={basicDoctorInfo.name}
            handleChange={(e) => {
              setBasicDoctorInfo({
                ...basicDoctorInfo,
                name: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Age" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomDatePicker
              value={dob}
              handleChange={(newValue: Dayjs | null) => {
                setDob(newValue);
                setBasicDoctorInfo({
                  ...basicDoctorInfo,
                  dateOfBirth: newValue?.toISOString() as string,
                });
                setShowEditBox && setShowEditBox(true);
              }}
            />
          </LocalizationProvider>
        </div>

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
                className="dark:text-[#D1D5DB]"
                control={
                  <Radio
                    checked={data.id === basicDoctorInfo.gender}
                    className="dark:text-[#D1D5DB]"
                    onChange={() => {
                      setBasicDoctorInfo({
                        ...basicDoctorInfo,
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
      </Box>
      <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
        <div className="flex flex-col mx-2">
          <LabelTypography title=" Phone Number" />
          <CustomTextField
            value={basicDoctorInfo.mobile}
            type="mobile"
            handleChange={(e) => {
              setBasicDoctorInfo({
                ...basicDoctorInfo,
                mobile: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Email" />
          <CustomTextField
            value={basicDoctorInfo.email}
            handleChange={(e) => {
              setBasicDoctorInfo({
                ...basicDoctorInfo,
                email: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
      </Box>
      <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
        <div className="flex flex-col mx-2">
          <LabelTypography title="Speciality" />
          <PlainSelector
            dataArr={specialities}
            title=""
            handleChange={(e: any, value: any) => {
              setBasicDoctorInfo({
                ...basicDoctorInfo,
                speciality: {
                  _id: e.target.value,
                  name: value,
                },
              });
              setShowEditBox && setShowEditBox(true);
            }}
            selectedValue={basicDoctorInfo.speciality._id}
          />
        </div>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Service fees" />
          <CustomTextField
            value={basicDoctorInfo.doctorFee}
            type="fees"
            handleChange={(e) => {
              setBasicDoctorInfo({
                ...basicDoctorInfo,
                doctorFee: +e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default BasicDoctorInfo;
