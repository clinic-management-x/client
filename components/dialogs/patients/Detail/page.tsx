import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { getDoctors } from "@/datafetch/doctors/doctors.api";
import { updatePatient } from "@/datafetch/patients/patients.api";
import config from "@/utils/config";
import { doctorEndPoint, patientsEndPoint } from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
  edit: boolean;
  mainData?: PatientType;
}

const DetailInfo = ({
  basicPatientInfo,
  setBasicPatientInfo,
  edit,
  mainData,
}: Props) => {
  const [doctorSearch, setDoctorSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [showEditBox, setShowEditBox] = useState(false);

  const { data, isLoading, mutate } = useSWR(
    `${
      config.apiBaseUrl
    }/${doctorEndPoint}?limit=${8}&skip=${0}&search=${doctorSearch}`,
    getDoctors
  );

  const { trigger, isMutating: updateMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${patientsEndPoint}/${basicPatientInfo._id}`,
    updatePatient
  );

  useEffect(() => {
    if (data) {
      setDoctors(data);
    }
  }, [data]);

  return (
    <div>
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
              setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 w-[50%]">
          <LabelTypography title=" Preferred Doctor" />

          <AutocompleteSearch
            dataArr={doctors}
            value={basicPatientInfo.preferredDoctor}
            dataIndex="name"
            handleChange={(e, newValue) => {
              const doctor = doctors?.find(
                (doctor: any) => doctor.name === newValue
              ) as unknown as DoctorType;
              setBasicPatientInfo({
                ...basicPatientInfo,
                preferredDoctor: doctor._id,
              });
              setShowEditBox(true);
            }}
            handleSearch={(e) => {
              if (e.target.value.length > 3) {
                mutate();
              }
            }}
          />
        </div>
      </div>
      {edit && showEditBox ? (
        <div className="mt-4 w-full flex justify-center">
          <CrossCheckButtonsGroup
            isLoading={updateMutating}
            handleCancel={() => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                occupation: mainData?.occupation,
                preferredDoctor: mainData?.preferredDoctor,
              });
              setShowEditBox(false);
            }}
            handleAdd={async () => {
              try {
                const payload = basicPatientInfo.preferredDoctor
                  ? {
                      occupation: basicPatientInfo.occupation,
                      preferredDoctor: basicPatientInfo.preferredDoctor,
                    }
                  : { occupation: basicPatientInfo.occupation };

                const data = await trigger(payload);
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

export default DetailInfo;
