import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { buySellUnits } from "@/utils/staticData";
import React, { useState } from "react";
import { defaultShowData } from "./page";

interface Props {
  medicine: MedicineTypeCreate;
  setMedicine: (data: MedicineTypeCreate) => void;
  data: MedicineTypeStandard;
  updateMedicine: (data: string) => void;
  updateMedicineMutating: boolean;
  stockUnit: string;
  alertUnit: string;
  setStockUnit: (data: string) => void;
  setAlertUnit: (data: string) => void;
  showEditButton: { type: string; show: boolean };
  setShowEditButton: (data: { type: string; show: boolean }) => void;
}
const Quantity = ({
  medicine,
  setMedicine,
  data,
  updateMedicine,
  updateMedicineMutating,
  stockUnit,
  alertUnit,
  setStockUnit,
  setAlertUnit,
  showEditButton,
  setShowEditButton,
}: Props) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center mx-2 my-2">
        <div className="flex flex-col  md:w-[180px]">
          <LabelTypography title="Total Quantity" />
          <CustomTextField
            value={medicine.stockQuantity}
            handleChange={(e) => {
              setShowEditButton({ type: "quantity", show: true });
              setMedicine({
                ...medicine,
                stockQuantity: +e.target.value,
              });
            }}
            type="number"
          />
        </div>
        <div className="flex flex-col mx-2 md:w-[100px]">
          <LabelTypography title="Unit" />
          <PlainSelector
            dataArr={buySellUnits}
            title=""
            handleChange={(e, value) => {
              const selectedUnit = buySellUnits.find(
                (unidata) => unidata._id === e.target.value
              );
              setShowEditButton({ type: "quantity", show: true });
              setMedicine({
                ...medicine,
                stockQuantityUnit: selectedUnit?.name as string,
              });
              setStockUnit(selectedUnit?._id as string);
            }}
            selectedValue={stockUnit}
          />
        </div>
        <div className="flex flex-col mx-2 md:w-[180px]">
          <LabelTypography title="Minimum Alert Quantity" />
          <CustomTextField
            value={medicine.minimumAlertQuantity}
            handleChange={(e) => {
              setShowEditButton({ type: "quantity", show: true });
              setMedicine({
                ...medicine,
                minimumAlertQuantity: +e.target.value,
              });
            }}
            type="number"
          />
        </div>
        <div className="flex flex-col mx-2 md:w-[100px]">
          <LabelTypography title="Unit" />
          <PlainSelector
            dataArr={buySellUnits}
            title=""
            handleChange={(e, value) => {
              const selectedUnit = buySellUnits.find(
                (unidata) => unidata._id === e.target.value
              );
              setShowEditButton({ type: "quantity", show: true });
              setMedicine({
                ...medicine,
                minimumAlertQuantityUnit: selectedUnit?.name as string,
              });
              setAlertUnit(selectedUnit?._id as string);
            }}
            selectedValue={alertUnit}
          />
        </div>
      </div>
      <div className="w-[500px] text-center">
        <DetailEditCancelButton
          show={showEditButton.type === "quantity" && showEditButton.show}
          handleCancel={() => {
            const selectedStockId = buySellUnits.find(
              (unidata) => unidata.name === data.stockQuantityUnit
            )?._id as string;
            const selectedAlertId = buySellUnits.find(
              (unidata) => unidata.name === data.minimumAlertQuantityUnit
            )?._id as string;
            setShowEditButton(defaultShowData);
            setMedicine({
              ...medicine,
              stockQuantity: data.stockQuantity,
              stockQuantityUnit: data.stockQuantityUnit,
              minimumAlertQuantity: data.minimumAlertQuantity,
              minimumAlertQuantityUnit: data.minimumAlertQuantityUnit,
            });
            setStockUnit(selectedStockId);
            setAlertUnit(selectedAlertId);
          }}
          handleUpdate={() => {
            updateMedicine("quantities");
          }}
          loading={updateMedicineMutating}
        />
      </div>
    </div>
  );
};

export default Quantity;
