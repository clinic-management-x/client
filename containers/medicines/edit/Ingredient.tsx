import AddButton from "@/components/buttons/AddButton/page";
import IngredientCreate from "@/components/dialogs/medicine/IngredientCreate/page";
import IngredientDiplay from "@/components/dialogs/medicine/IngredientDisplay/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { getActiveIngridients } from "@/datafetch/medicines/medicines.api";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface Props {
  medicine: MedicineTypeCreate;
  setMedicine: (data: MedicineTypeCreate) => void;
}

const Ingredient = ({ medicine, setMedicine }: Props) => {
  const [showIngredient, setShowIngredient] = useState(false);
  const [activeIngredients, setActiveIngredients] = useState<
    { _id: string; activeIngredientName: string }[]
  >([]);
  const [ingredientSearch, setIngredientSearch] = useState("");

  const { data: activeIngredientsData, mutate: ingredientMutate } = useSWR(
    `${config.apiBaseUrl}/${medicineEndPoint}/active-ingredients?search=${ingredientSearch}`,
    getActiveIngridients
  );

  useEffect(() => {
    if (activeIngredientsData) {
      setActiveIngredients(activeIngredientsData);
    }
  }, [activeIngredientsData]);

  useEffect(() => {
    if (ingredientSearch.length > 4) {
      ingredientMutate();
    }
  }, [ingredientSearch]);

  return (
    <div className="ml-2">
      <LabelTypography title="Active Ingredients" />
      <IngredientDiplay
        activeIngredients={medicine.activeIngredients}
        basicMedicineInfo={medicine}
        setBasicMedicineInfo={setMedicine}
        edit={true}
      />
      {showIngredient ? (
        <div className="lg:w-[50%]">
          <IngredientCreate
            activeIngredients={activeIngredients}
            basicMedicineInfo={medicine}
            setBasicMedicineInfo={setMedicine}
            setIngredientSearch={setIngredientSearch}
            setShowIngredient={setShowIngredient}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="ml-2">
        <AddButton
          handleClick={() => {
            setShowIngredient(true);
          }}
        />
      </div>
    </div>
  );
};

export default Ingredient;
