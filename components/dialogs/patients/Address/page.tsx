"use client";
import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import React, { useEffect, useState } from "react";
import country from "country-list-js";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { patientsEndPoint } from "@/utils/endpoints";
import { updatePatient } from "@/datafetch/patients/patients.api";
import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import toast from "react-hot-toast";

interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
  edit: boolean;
  mainData?: PatientType;
}

const AddressData = ({
  basicPatientInfo,
  setBasicPatientInfo,
  edit,
  mainData,
}: Props) => {
  const countries = country.names().map((name: string, index: number) => {
    return { name, _id: "" + index };
  });
  const [selectedId, setSelectedId] = useState("103");
  const [showEditBox, setShowEditBox] = useState(false);

  const { trigger, isMutating: updateMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${patientsEndPoint}/${basicPatientInfo._id}`,
    updatePatient
  );

  useEffect(() => {
    if (edit && mainData) {
      const countryId = countries.find(
        (country) => country.name === mainData.country
      )?._id;
      setSelectedId(countryId as string);
    }
  }, [mainData]);

  return (
    <div className="flex flex-col  w-full mt-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col mx-2 w-[30%]">
          <LabelTypography title="City" />
          <CustomTextField
            value={basicPatientInfo.city as string}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                city: e.target.value,
              });
              setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 w-[30%]">
          <LabelTypography title="State" />
          <CustomTextField
            value={basicPatientInfo.state as string}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                state: e.target.value,
              });
              setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 w-[30%]">
          <LabelTypography title="Country" />
          <PlainSelector
            dataArr={countries}
            title={"Country"}
            handleChange={(e: any, value: any) => {
              const selectedCountry = countries.find(
                (country) => country._id === e.target.value
              );

              setSelectedId(e.target.value);
              setBasicPatientInfo({
                ...basicPatientInfo,
                country: selectedCountry?.name,
              });
              setShowEditBox(true);
            }}
            selectedValue={selectedId}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col mx-2 w-[50%]">
          <LabelTypography title="Address" />
          <CustomTextField
            value={basicPatientInfo.address as string}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                address: e.target.value,
              });
              setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 w-[50%]">
          <LabelTypography title="Postal code" />
          <CustomTextField
            value={basicPatientInfo.postalCode as string}
            handleChange={(e) => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                postalCode: e.target.value,
              });
              setShowEditBox(true);
            }}
          />
        </div>
      </div>
      {edit && showEditBox ? (
        <div className="mt-4 flex items-center justify-center w-full">
          <CrossCheckButtonsGroup
            isLoading={updateMutating}
            handleCancel={() => {
              setBasicPatientInfo({
                ...basicPatientInfo,
                city: mainData?.city,
                state: mainData?.state,
                country: mainData?.country,
                postalCode: mainData?.postalCode,
                address: mainData?.address,
              });
              const countryId = countries.find(
                (country) => country.name === mainData?.country
              )?._id;
              setSelectedId(countryId as string);
              setShowEditBox(false);
            }}
            handleAdd={async () => {
              try {
                const data = await trigger({
                  city: basicPatientInfo.city,
                  state: basicPatientInfo.state,
                  country: basicPatientInfo.country,
                  postalCode: basicPatientInfo.postalCode,
                  address: basicPatientInfo.address,
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

export default AddressData;
