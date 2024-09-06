import AddButton from "@/components/buttons/AddButton/page";
import SellUnitCreate from "@/components/dialogs/medicine/SellUnitCreate/page";
import SellUnitDisplay from "@/components/dialogs/medicine/SellUnitDisplay/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import React, { useState } from "react";
interface Props {
  medicine: MedicineTypeCreate;
  setMedicine: (data: MedicineTypeCreate) => void;
}
const SellPrices = ({ medicine, setMedicine }: Props) => {
  const [showSellUnits, setShowSellUnits] = useState(false);
  return (
    <div>
      <div className="ml-2">
        <LabelTypography title="Sell" />
      </div>
      <SellUnitDisplay
        sellPrices={medicine.sellPrices}
        basicMedicineInfo={medicine}
        setBasicMedicineInfo={setMedicine}
        edit={true}
      />

      {showSellUnits ? (
        <SellUnitCreate
          basicMedicineInfo={medicine}
          setBasicMedicineInfo={setMedicine}
          setShowSellUnits={setShowSellUnits}
          edit={true}
        />
      ) : (
        <></>
      )}

      <div className="ml-2">
        <AddButton
          handleClick={() => {
            setShowSellUnits(true);
          }}
        />
      </div>
    </div>
  );
};

export default SellPrices;
