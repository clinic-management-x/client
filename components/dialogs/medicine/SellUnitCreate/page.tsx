import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { updateMedicineData } from "@/datafetch/medicines/medicines.api";
import { getCurrentMedicineId } from "@/redux/slices/inventory";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import { buySellUnits } from "@/utils/staticData";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useSWRMutation from "swr/mutation";

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
  const alreadyUsedUnits = basicMedicineInfo.sellPrices.map(
    (pricedata) => pricedata.unit
  );
  const medicineId = useSelector(getCurrentMedicineId);
  const [currentSellData, setCurrentSellData] = useState({
    price: 0,
    unit: "",
  });
  const [sellUnit, setSellUnit] = useState("");
  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}/${medicineId}`,
    updateMedicineData
  );
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
          dataArr={buySellUnits.filter(
            (unitdata) => !alreadyUsedUnits.includes(unitdata.name)
          )}
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
          handleAdd={async () => {
            if (currentSellData.price == 0 || currentSellData.unit == "") {
              return toast.error("Fill all fields.");
            }
            try {
              const data = await trigger({
                sellPrices: [...basicMedicineInfo.sellPrices, currentSellData],
              });
              if (data) {
                toast.success("Successfully updated.");
                setBasicMedicineInfo({
                  ...basicMedicineInfo,
                  sellPrices: data.sellPrices,
                });
                setCurrentSellData({
                  price: 0,
                  unit: "",
                });
                setShowSellUnits(false);
              }
            } catch (error) {
              toast.error("Something went wrong.");
            }
          }}
          isLoading={isMutating}
        />
      </div>
    </div>
  );
};

export default SellUnitCreate;
