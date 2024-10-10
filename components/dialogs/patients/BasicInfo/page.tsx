import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import CustomDatePicker from "@/components/selectors/CustomDatePicker/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { updatePatient } from "@/datafetch/patients/patients.api";
import config from "@/utils/config";
import { patientsEndPoint } from "@/utils/endpoints";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
  edit: boolean;
  mainData?: PatientType;
}

const BasicInfo = ({
  basicPatientInfo,
  setBasicPatientInfo,
  edit,
  mainData,
}: Props) => {
  const [dob, setDob] = useState<Dayjs | null>(dayjs());
  const [showEditBox, setShowEditBox] = useState(false);

  const { trigger, isMutating: updateMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${patientsEndPoint}/${basicPatientInfo._id}`,
    updatePatient
  );

  useEffect(() => {
    if (edit && mainData) {
      setDob(dayjs(mainData.dateOfBirth));
    }
  }, [mainData]);

  return (
    <div className="flex flex-col  items-center  mx-2 md:mx-0">
      <div className="flex flex-col md:flex-row items-center  justify-between w-full">
        <div className="flex flex-col mx-2 w-full md:w-[30%]">
          <LabelTypography title=" Name" />
          <CustomTextField
            value={basicPatientInfo.name}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                name: e.target.value,
              });
              setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 mt-2 md:mt-0 w-full md:w-[30%]">
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
                setShowEditBox(true);
              }}
            />
          </LocalizationProvider>
        </div>
        <FormControl
          id="demo-row-radio-buttons-group-label"
          className="mx-2 w-full mt-2 md:mt-0 md:w-[30%]"
        >
          <LabelTypography title="Gender" />
          <RadioGroup
            row
            className="border-[1px] w-full rounded-md border-[#9CA3AF] h-[55px]  flex items-center justify-center pl-4 md:pl-1 md:justify-center"
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
                      setShowEditBox(true);
                    }}
                  />
                }
                label={data.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      {edit && showEditBox ? (
        <div className="mt-4">
          <CrossCheckButtonsGroup
            isLoading={updateMutating}
            handleCancel={() => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                name: "" + mainData?.name,
                dateOfBirth: "" + mainData?.dateOfBirth,
                gender: "" + mainData?.gender,
              });
              setShowEditBox(false);
            }}
            handleAdd={async () => {
              try {
                const data = await trigger({
                  name: basicPatientInfo.name,
                  dateOfBirth: basicPatientInfo.dateOfBirth,
                  gender: basicPatientInfo.gender,
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
    </div>
  );
};

export default BasicInfo;
