import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { buySellUnits } from "@/utils/staticData";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  basicMedicineInfo: MedicineTypeCreate;
  setShowSellUnits: (data: boolean) => void;
}
const SellUnitCreate = ({
  setBasicMedicineInfo,
  basicMedicineInfo,
  setShowSellUnits,
}: Props) => {
  const [currentSellData, setCurrentSellData] = useState({
    price: 0,
    unit: "",
  });
  const [sellUnit, setSellUnit] = useState("");
  return (
    <div className="flex flex-col md:flex-row items-center mx-2 my-2">
      <div className="flex flex-col  md:w-[180px]">
        <LabelTypography title="Sell Price" />
        <CustomTextField
          value={currentSellData.price}
          handleChange={(e) => {
            setCurrentSellData({
              ...currentSellData,
              price: +e.target.value,
            });
          }}
          type="number"
        />
      </div>
      <div className="mx-6 mt-6">
        <LabelTypography title="Per" />
      </div>
      <div className="flex flex-col mx-2 md:w-[100px]">
        <LabelTypography title="Unit" />
        <PlainSelector
          dataArr={buySellUnits}
          title=""
          handleChange={(e, value) => {
            setSellUnit(e.target.value);
            const selectedUnit = buySellUnits.find(
              (unit) => unit._id === e.target.value
            );
            setCurrentSellData({
              ...currentSellData,
              unit: selectedUnit?.name || "",
            });
          }}
          selectedValue={sellUnit}
        />
      </div>
      <div className="mt-4">
        <CrossCheckButtonsGroup
          handleCancel={() => {
            setSellUnit("");
            setCurrentSellData({ price: 0, unit: "" });
            setShowSellUnits(false);
          }}
          handleAdd={() => {
            if (currentSellData.price == 0 || currentSellData.unit == "") {
              return toast.error("Fill all fields.");
            }
            setBasicMedicineInfo({
              ...basicMedicineInfo,
              sellPrices: [...basicMedicineInfo.sellPrices, currentSellData],
            });
            setShowSellUnits(false);
          }}
        />
      </div>
    </div>
  );
};

export default SellUnitCreate;
