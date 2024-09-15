import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { createIngredient } from "@/datafetch/medicines/medicines.api";
import { getCurrentMedicineId } from "@/redux/slices/inventory";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import { units } from "@/utils/staticData";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useSWRMutation from "swr/mutation";

interface Props {
  activeIngredients: { _id: string; activeIngredientName: string }[];
  setIngredientSearch: (data: string) => void;
  basicMedicineInfo: MedicineTypeCreate;
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  setShowIngredient: (data: boolean) => void;
  edit?: boolean;
}
const IngredientCreate = ({
  activeIngredients,
  setIngredientSearch,
  basicMedicineInfo,
  setBasicMedicineInfo,
  setShowIngredient,
  edit,
}: Props) => {
  const medicineId = useSelector(getCurrentMedicineId);
  const [currentIngredient, setCurrentIngredient] = useState({
    _id: "",
    activeIngredient: "",
    strength: 0,
    unit: "",
  });
  const [currentUnit, setCurrentUnit] = useState("");
  const { trigger, isMutating: createIngredientMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}/active-ingredient-component/${medicineId}`,
    createIngredient
  );

  return (
    <div className="flex flex-col md:flex-row items-center space-x-2    w-full mt-2">
      <div className=" w-full md:w-[300px] ">
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
                activeIngredient: selectedIngredient.activeIngredientName,
                _id: selectedIngredient._id,
              });
            }
          }}
          handleSearch={(e) => {
            setIngredientSearch(e.target.value);
          }}
        />
      </div>

      <div className="w-full md:w-[150px]">
        <LabelTypography title="Dose" />
        <CustomTextField
          className="w-full"
          type="number"
          value={currentIngredient.strength}
          handleChange={(e) => {
            setCurrentIngredient({
              ...currentIngredient,
              strength: e.target.value,
            });
          }}
        />
      </div>
      <div className="w-full md:w-[100px] ">
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
              _id: "",
              activeIngredient: "",
              strength: 0,
              unit: "",
            });
            setCurrentUnit("");
            setShowIngredient(false);
          }}
          handleAdd={async () => {
            if (
              currentIngredient.activeIngredient !== "" &&
              currentIngredient.strength !== 0 &&
              currentIngredient.unit !== ""
            ) {
              if (edit) {
                try {
                  const data = await trigger({
                    activeIngredient: currentIngredient._id,
                    strength: +currentIngredient.strength,
                    unit: currentIngredient.unit,
                  });
                  if (data) {
                    toast.success("Successfully updated.");
                    setBasicMedicineInfo({
                      ...basicMedicineInfo,
                      activeIngredients: data.activeIngredients.map(
                        (ingredientdata: ActiveIngridient) => {
                          return {
                            componentId: ingredientdata._id,
                            _id: ingredientdata.activeIngredient._id,
                            activeIngredient:
                              ingredientdata.activeIngredient
                                .activeIngredientName,
                            strength: ingredientdata.strength,
                            unit: ingredientdata.unit,
                          };
                        }
                      ),
                    });
                    setShowIngredient(false);
                    setCurrentUnit("");
                    setCurrentIngredient({
                      _id: "",
                      activeIngredient: "",
                      strength: 0,
                      unit: "",
                    });
                  }
                } catch (error) {
                  toast.error("Something went wrong.");
                }
              } else {
                setBasicMedicineInfo({
                  ...basicMedicineInfo,
                  activeIngredients: [
                    ...basicMedicineInfo.activeIngredients,
                    {
                      _id: currentIngredient._id,
                      activeIngredient: currentIngredient.activeIngredient,
                      strength: +currentIngredient.strength,
                      unit: currentIngredient.unit,
                    },
                  ],
                });
                setShowIngredient(false);
                setCurrentUnit("");
                setCurrentIngredient({
                  _id: "",
                  activeIngredient: "",
                  strength: 0,
                  unit: "",
                });
              }
            } else {
              toast.error("Fill all field");
            }
          }}
          isLoading={createIngredientMutating}
        />
      </div>
    </div>
  );
};

export default IngredientCreate;
