import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { units } from "@/utils/staticData";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  activeIngredients: { _id: string; activeIngredientName: string }[];
  setIngredientSearch: (data: string) => void;
  basicMedicineInfo: MedicineTypeCreate;
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  setShowIngredient: (data: boolean) => void;
}
const IngredientCreate = ({
  activeIngredients,
  setIngredientSearch,
  basicMedicineInfo,
  setBasicMedicineInfo,
  setShowIngredient,
}: Props) => {
  const [currentIngredient, setCurrentIngredient] = useState({
    activeIngredient: "",
    strength: 0,
    unit: "",
  });
  const [currentUnit, setCurrentUnit] = useState("");
  return (
    <div className="flex flex-col md:flex-row items-center space-x-2 justify-between ml-2  w-full mt-2">
      <div className="w-[300px] ">
        <LabelTypography title="Name" />
        <AutocompleteSearch
          dataArr={activeIngredients}
          dataIndex="activeIngredientName"
          handleChange={(e, newValue) => {
            const selectedIngredient = activeIngredients.find(
              (ingredient) => ingredient.activeIngredientName === newValue
            );
            if (selectedIngredient) {
              setCurrentIngredient({
                ...currentIngredient,
                activeIngredient: newValue,
              });
            }
          }}
          handleSearch={(e) => {
            setIngredientSearch(e.target.value);
          }}
        />
      </div>
      <div>
        <LabelTypography title="Dose" />
        <CustomTextField
          value={currentIngredient.strength}
          handleChange={(e) => {
            setCurrentIngredient({
              ...currentIngredient,
              strength: +e.target.value,
            });
          }}
        />
      </div>
      <div className="w-[100px]">
        <LabelTypography title="Unit" />
        <PlainSelector
          dataArr={units}
          title=""
          handleChange={(e, value) => {
            const selectedUnit = units.find(
              (unit) => unit._id === e.target.value
            );
            setCurrentIngredient({
              ...currentIngredient,
              unit: selectedUnit?.name || "",
            });
            setCurrentUnit(selectedUnit?._id || "");
          }}
          selectedValue={currentUnit}
        />
      </div>
      <div className="mt-4">
        <CrossCheckButtonsGroup
          handleCancel={() => {
            setCurrentIngredient({
              activeIngredient: "",
              strength: 0,
              unit: "",
            });
            setCurrentUnit("");
            setShowIngredient(false);
          }}
          handleAdd={() => {
            if (
              currentIngredient.activeIngredient !== "" &&
              currentIngredient.strength !== 0 &&
              currentIngredient.unit !== ""
            ) {
              setBasicMedicineInfo({
                ...basicMedicineInfo,
                activeIngredients: [
                  ...basicMedicineInfo.activeIngredients,
                  currentIngredient,
                ],
              });
              setCurrentIngredient({
                activeIngredient: "",
                strength: 0,
                unit: "",
              });
              setCurrentUnit("");
              setShowIngredient(false);
            } else {
              toast.error("Fill all field");
            }
          }}
        />
      </div>
    </div>
  );
};

export default IngredientCreate;
