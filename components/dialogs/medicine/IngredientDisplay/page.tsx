import EditButton from "@/components/buttons/EditButton/page";
import TrashButton from "@/components/buttons/TrashButton/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import {
  deleteIngredient,
  updateIngredient,
} from "@/datafetch/medicines/medicines.api";
import { getCurrentMedicineId } from "@/redux/slices/inventory";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import { units } from "@/utils/staticData";
import { IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import useSWRMutation from "swr/mutation";
import DeleteDialog from "../../delete";

interface Props {
  activeIngredients: ActiveIngredientCreate[];
  basicMedicineInfo: MedicineTypeCreate;
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  edit?: boolean;
}
const IngredientDiplay = ({
  activeIngredients,
  basicMedicineInfo,
  setBasicMedicineInfo,
  edit,
}: Props) => {
  const medicineId = useSelector(getCurrentMedicineId);
  const [ingredientToEdit, setIngredientToEdit] =
    useState<ActiveIngredientCreate | null>(null);
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const { trigger, isMutating: updateIngredientMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}/active-ingredient-component/${ingredientToEdit?.componentId}`,
    updateIngredient
  );

  const { trigger: deleteTrigger, isMutating: deleteIngredientMutating } =
    useSWRMutation(
      `${config.apiBaseUrl}/${medicineEndPoint}/active-ingredient-component/${ingredientId}?medicineId=${medicineId}`,
      deleteIngredient
    );

  return (
    <>
      {activeIngredients.length ? (
        activeIngredients.map((data, index) => {
          return (
            <div className="" key={index}>
              <div className="flex items-center mb-2 ">
                {ingredientToEdit &&
                ingredientToEdit.componentId === data.componentId ? (
                  <div className="flex flex-col  md:flex-row items-center space-x-2 ml-2  mt-2">
                    <CustomTextField
                      value={ingredientToEdit.activeIngredient}
                      handleChange={(e) => {
                        toast.error(
                          "Ingredient name can't be edited once it is created."
                        );
                      }}
                      className="w-[300px] ml-[-8px]"
                    />

                    <div className="w-[150px]">
                      <CustomTextField
                        type="number"
                        value={ingredientToEdit.strength}
                        handleChange={(e) => {
                          setIngredientToEdit({
                            ...ingredientToEdit,
                            strength: +e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="w-[100px]">
                      <PlainSelector
                        dataArr={units}
                        title=""
                        handleChange={(e, value) => {
                          const selectedUnit = units.find(
                            (unit) => unit._id === e.target.value
                          );
                          setIngredientToEdit({
                            ...ingredientToEdit,
                            unit: selectedUnit?.name || "",
                          });
                        }}
                        selectedValue={
                          units.find(
                            (unit) => unit.name === ingredientToEdit.unit
                          )?._id
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center px-2 md:w-[300px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2">
                    <Typography
                      variant="body1"
                      className="dark:text-darkText text-whiteText"
                    >
                      {data.activeIngredient}
                      {","} {data.strength} {data.unit}
                    </Typography>
                  </div>
                )}

                {ingredientToEdit &&
                ingredientToEdit.componentId === data.componentId ? (
                  <div className="flex items-center ml-2 space-x-1">
                    <IconButton
                      onClick={() => {
                        setIngredientToEdit(null);
                        setBasicMedicineInfo({
                          ...basicMedicineInfo,
                          activeIngredients: activeIngredients,
                        });
                      }}
                    >
                      <RxCross2 />
                    </IconButton>

                    <IconButton>
                      <MdCheck
                        className="text-green-500"
                        onClick={async () => {
                          try {
                            const data = await trigger({
                              strength: ingredientToEdit.strength,
                              unit: ingredientToEdit.unit,
                            });
                            if (data) {
                              toast.success("Successfully updated");
                              setIngredientToEdit(null);
                              setBasicMedicineInfo({
                                ...basicMedicineInfo,
                                activeIngredients:
                                  basicMedicineInfo.activeIngredients.map(
                                    (ingredient) => {
                                      return ingredient.componentId === data._id
                                        ? {
                                            ...ingredient,
                                            strength: data.strength,
                                            unit: data.unit,
                                          }
                                        : ingredient;
                                    }
                                  ),
                              });
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
                          setIngredientToEdit(data);
                        }}
                      />
                    ) : (
                      <></>
                    )}

                    <TrashButton
                      handleClick={() => {
                        setIngredientId(data.componentId as string);
                        setIngredientName(data.activeIngredient);
                        setOpenDeleteBox(true);
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
        open={openDeleteBox}
        handleClose={() => {
          setOpenDeleteBox(false);
          setIngredientName("");
          setIngredientId("");
        }}
        text={`this ingredient: ${ingredientName}`}
        handleDelete={async () => {
          try {
            const data = await deleteTrigger();
            if (data) {
              setBasicMedicineInfo({
                ...basicMedicineInfo,
                activeIngredients: data.activeIngredients.map(
                  (ingredientdata: ActiveIngridient) => {
                    return {
                      componentId: ingredientdata._id,
                      _id: ingredientdata.activeIngredient._id,
                      activeIngredient:
                        ingredientdata.activeIngredient.activeIngredientName,
                      strength: ingredientdata.strength,
                      unit: ingredientdata.unit,
                    };
                  }
                ),
              });
              setOpenDeleteBox(false);
            }
          } catch (error) {
            toast.error("Something went wrong.");
          }
        }}
        loading={deleteIngredientMutating}
      />
    </>
  );
};

export default IngredientDiplay;
