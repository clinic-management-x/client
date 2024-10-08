"use client";
import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import React, { useState } from "react";
import country from "country-list-js";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";

interface Props {
  basicPatientInfo: PatientType;
  setBasicPatientInfo: (data: PatientType) => void;
}

const AddressData = ({ basicPatientInfo, setBasicPatientInfo }: Props) => {
  const countries = country.names().map((name: string, index: number) => {
    return { name, _id: "" + index };
  });
  const [selectedId, setSelectedId] = useState("103");

  return (
    <div className="flex flex-col justify-between w-full mt-4">
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
              // setShowEditBox && setShowEditBox(true);
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
              // setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 w-[30%]">
          <LabelTypography title="Country" />
          <PlainSelector
            dataArr={countries}
            title={"Country"}
            handleChange={(e: any, value: any) => {
              console.log("e", e.target.value);
              const selectedCountry = countries.find(
                (country) => country._id === e.target.value
              );
              setSelectedId(e.target.value);
              setBasicPatientInfo({
                ...basicPatientInfo,
                country: selectedCountry?.name,
              });
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
              // setShowEditBox && setShowEditBox(true);
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
              // setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressData;
