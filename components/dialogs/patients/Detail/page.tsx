import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { getDoctors } from "@/datafetch/doctors/doctors.api";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
}

const DetailInfo = ({ basicPatientInfo, setBasicPatientInfo }: Props) => {
  const [doctorSearch, setDoctorSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const { data, isLoading, mutate } = useSWR(
    `${
      config.apiBaseUrl
    }/${doctorEndPoint}?limit=${8}&skip=${0}&search=${doctorSearch}`,
    getDoctors
  );
  useEffect(() => {
    if (data) {
      setDoctors(data);
    }
  }, [data]);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex flex-col mx-2 w-[50%]">
        <LabelTypography title="Occupation" />
        <CustomTextField
          value={basicPatientInfo.occupation as string}
          handleChange={(e) => {
            setBasicPatientInfo({
              ...basicPatientInfo,
              occupation: e.target.value,
            });
            // setShowEditBox && setShowEditBox(true);
          }}
        />
      </div>
      <div className="flex flex-col mx-2 w-[50%]">
        <LabelTypography title=" Preferred Doctor" />
        {/* <CustomTextField
          value={basicPatientInfo.name}
          handleChange={(e) => {
            setBasicPatientInfo({
              ...basicPatientInfo,
              name: e.target.value,
            });
            // setShowEditBox && setShowEditBox(true);
          }}
        /> */}
        <AutocompleteSearch
          dataArr={doctors}
          dataIndex="name"
          handleChange={(e, newValue) => {
            const doctor = doctors?.find(
              (doctor: any) => doctor.name === newValue
            ) as unknown as DoctorType;
            setBasicPatientInfo({
              ...basicPatientInfo,
              preferredDoctor: doctor._id,
            });
          }}
          handleSearch={(e) => {
            if (e.target.value.length > 3) {
              mutate();
            }
          }}
        />
      </div>
    </div>
  );
};

export default DetailInfo;
