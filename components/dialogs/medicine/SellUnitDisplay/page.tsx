import EditButton from "@/components/buttons/EditButton/page";
import TrashButton from "@/components/buttons/TrashButton/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { updateMedicineData } from "@/datafetch/medicines/medicines.api";
import { getCurrentMedicineId } from "@/redux/slices/inventory";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import { buySellUnits } from "@/utils/staticData";
import { IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import useSWRMutation from "swr/mutation";
import DeleteDialog from "../../delete";

interface Props {
  sellPrices: { price: number; unit: string }[];
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  basicMedicineInfo: MedicineTypeCreate;
  edit: boolean;
}
const SellUnitDisplay = ({
  sellPrices,
  basicMedicineInfo,
  setBasicMedicineInfo,
  edit,
}: Props) => {
  const medicineId = useSelector(getCurrentMedicineId);
  const [sellUnitToEdit, setSellUnitToEdit] = useState<{
    price: number;
    unit: string;
  } | null>(null);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}/${medicineId}`,
    updateMedicineData
  );

  return (
    <>
      {sellPrices.length ? (
        sellPrices.map((data, index) => {
          return (
            <div className="mx-2" key={index}>
              <div className="flex items-center mb-2 ">
                {sellUnitToEdit && sellUnitToEdit.unit === data.unit ? (
                  <div className="flex  items-center mx-2 my-2">
                    <div className="flex flex-col  md:w-[180px]">
                      <CustomTextField
                        value={sellUnitToEdit?.price as number}
                        handleChange={(e) => {
                          if (+e.target.value <= 0) {
                            toast.error("Price must be greater than 0.");
                          }
                          setSellUnitToEdit({
                            ...sellUnitToEdit,
                            price: +e.target.value,
                          });
                        }}
                        type="number"
                      />
                    </div>
                    <div className="mx-6 mt-2">
                      <LabelTypography title="Per" />
                    </div>
                    <div className="flex flex-col mx-2 md:w-[100px]">
                      <CustomTextField
                        value={sellUnitToEdit.unit}
                        handleChange={() => {
                          toast.error(
                            "Unit can't be changed once it is created."
                          );
                        }}
                        className="w-[100px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center px-2 w-full md:w-[300px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2">
                    <Typography
                      variant="body1"
                      className="dark:text-darkText text-whiteText"
                    >
                      {data.price}
                      {"  per  "} {data.unit}
                    </Typography>
                  </div>
                )}

                {!showDeleteBox &&
                sellUnitToEdit &&
                sellUnitToEdit.unit === data.unit ? (
                  <div className="flex items-center ml-2 space-x-1">
                    <IconButton
                      onClick={() => {
                        setSellUnitToEdit(null);
                        setBasicMedicineInfo({
                          ...basicMedicineInfo,
                          sellPrices: sellPrices,
                        });
                      }}
                    >
                      <RxCross2 className="dark:text-darkText" />
                    </IconButton>

                    <IconButton>
                      <MdCheck
                        className="text-green-500"
                        onClick={async () => {
                          const sellPrices = basicMedicineInfo.sellPrices.map(
                            (sellprice) => {
                              return sellprice.unit == sellUnitToEdit.unit
                                ? sellUnitToEdit
                                : sellprice;
                            }
                          );
                          try {
                            const data = await trigger({
                              sellPrices: sellPrices,
                            });
                            if (data) {
                              toast.success("Successfully updated.");
                              setBasicMedicineInfo({
                                ...basicMedicineInfo,
                                sellPrices: data.sellPrices,
                              });
                              setSellUnitToEdit(null);
                            }
                          } catch (error) {
                            toast.error("Something went wrong.");
                          }
                        }}
                      />
                    </IconButton>
                  </div>
                ) : (
                  <div className="flex items-center ml-2 space-x-1">
                    {edit ? (
                      <EditButton
                        handleClick={() => {
                          setSellUnitToEdit(data);
                        }}
                      />
                    ) : (
                      <></>
                    )}

                    <TrashButton
                      handleClick={() => {
                        if (edit) {
                          setShowDeleteBox(true);
                          setSellUnitToEdit(data);
                        } else {
                          setBasicMedicineInfo({
                            ...basicMedicineInfo,
                            sellPrices: basicMedicineInfo.sellPrices.filter(
                              (sellpricedata) =>
                                sellpricedata.unit !== data.unit
                            ),
                          });
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      <DeleteDialog
        open={showDeleteBox}
        handleClose={() => {
          setShowDeleteBox(false);
          setSellUnitToEdit(null);
        }}
        text={""}
        handleDelete={async () => {
          const sellPrices = basicMedicineInfo.sellPrices.filter(
            (selldata) => selldata.unit !== sellUnitToEdit?.unit
          );
          try {
            const data = await trigger({
              sellPrices: sellPrices,
            });
            if (data) {
              toast.success("Successfully updated.");
              setBasicMedicineInfo({
                ...basicMedicineInfo,
                sellPrices: data.sellPrices,
              });
              setSellUnitToEdit(null);
              setShowDeleteBox(false);
            }
          } catch (error) {
            toast.error("Something went wrong.");
          }
        }}
        loading={isMutating}
      />
    </>
  );
};

export default SellUnitDisplay;
