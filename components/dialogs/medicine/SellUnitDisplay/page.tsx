import TrashButton from "@/components/buttons/TrashButton/page";
import { Typography } from "@mui/material";
import React from "react";

interface Props {
  sellPrices: { price: number; unit: string }[];
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  basicMedicineInfo: MedicineTypeCreate;
}
const SellUnitDisplay = ({
  sellPrices,
  basicMedicineInfo,
  setBasicMedicineInfo,
}: Props) => {
  return (
    <>
      {sellPrices.length ? (
        sellPrices.map((data, index) => {
          return (
            <div className="mx-2" key={index}>
              <div className="flex items-center mb-2 ">
                <div className="flex items-center px-2 w-[260px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2">
                  <Typography
                    variant="body1"
                    className="dark:text-darkText text-whiteText"
                  >
                    {data.price}
                    {"  per  "} {data.unit}
                  </Typography>
                </div>{" "}
                <div className="flex items-center ml-2 space-x-1">
                  <TrashButton
                    handleClick={() => {
                      setBasicMedicineInfo({
                        ...basicMedicineInfo,
                        sellPrices: basicMedicineInfo.sellPrices.filter(
                          (data, i) => i !== index
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

export default SellUnitDisplay;
