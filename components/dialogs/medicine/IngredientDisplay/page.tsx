import TrashButton from "@/components/buttons/TrashButton/page";
import { Typography } from "@mui/material";
import React from "react";

interface Props {
  activeIngredients: {
    activeIngredient: string;
    strength: number;
    unit: string;
  }[];
  basicMedicineInfo: MedicineTypeCreate;
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
}
const IngredientDiplay = ({
  activeIngredients,
  basicMedicineInfo,
  setBasicMedicineInfo,
}: Props) => {
  return (
    <>
      {activeIngredients.length ? (
        activeIngredients.map((data, index) => {
          return (
            <div className="" key={index}>
              <div className="flex items-center mb-2 ">
                <div className="flex items-center px-2 w-[260px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2">
                  <Typography
                    variant="body1"
                    className="dark:text-darkText text-whiteText"
                  >
                    {data.activeIngredient}
                    {","} {data.strength} {data.unit}
                  </Typography>
                </div>{" "}
                <div className="flex items-center ml-2 space-x-1">
                  <TrashButton
                    handleClick={() => {
                      setBasicMedicineInfo({
                        ...basicMedicineInfo,
                        activeIngredients:
                          basicMedicineInfo.activeIngredients.filter(
                            (ingredient) =>
                              ingredient.activeIngredient !==
                              data.activeIngredient
                          ),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default IngredientDiplay;
