import React, { useEffect, useState } from "react";
import { QuantityRealtions } from "../CreateMedicineDialog/page";
import { IconButton, Typography } from "@mui/material";
import TrashButton from "@/components/buttons/TrashButton/page";
import EditButton from "@/components/buttons/EditButton/page";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import toast from "react-hot-toast";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import DeleteDialog from "../../delete";

interface Props {
  quantityRelations: QuantityRealtions[];
  setQuantityRelations: (data: QuantityRealtions[]) => void;
  selectedUnits?: { _id: string; name: string }[];
  edit?: boolean;
  trigger?: any;
}
const QuantityRealtionsDisplay = ({
  quantityRelations,
  setQuantityRelations,
  selectedUnits,
  edit,
  trigger,
}: Props) => {
  const [quantityRelationToEdit, setQuantityRelationToEdit] =
    useState<QuantityRealtions | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [lowerUnit, setLowerUnit] = useState("");
  const [upperUnit, setUpperUnit] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (quantityRelationToEdit) {
      const foundUnitLower = selectedUnits?.find(
        (unit) => unit.name === quantityRelationToEdit.lowerUnit
      );
      const foundUnitUpper = selectedUnits?.find(
        (unit) => unit.name === quantityRelationToEdit.upperUnit
      );
      setLowerUnit(foundUnitLower?._id || "");
      setUpperUnit(foundUnitUpper?._id || "");
    }
  }, [quantityRelationToEdit]);

  return (
    <div>
      {quantityRelations.length ? (
        quantityRelations.map((relationdata, index) => {
          return (
            <div className="flex items-center space-x-2 mb-2">
              {!openDeleteDialog &&
              quantityRelationToEdit &&
              currentIndex === index ? (
                <>
                  <div className="w-[120px]">
                    <CustomTextField
                      value={quantityRelationToEdit.quantityRelation}
                      handleChange={(e) => {
                        setQuantityRelationToEdit({
                          ...quantityRelationToEdit,
                          quantityRelation: +e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="w-[150px]">
                    <PlainSelector
                      dataArr={selectedUnits || []}
                      title={"Lower unit"}
                      handleChange={(e) => {
                        const foundUnit = selectedUnits?.find(
                          (unit) => unit._id === e.target.value
                        );

                        setQuantityRelationToEdit({
                          ...quantityRelationToEdit,
                          lowerUnit: foundUnit?.name || "",
                        });
                        setLowerUnit(foundUnit?._id || "");
                      }}
                      selectedValue={lowerUnit}
                    />
                  </div>
                  <Typography className="dark:text-darkText text-whiteText">
                    {" "}
                    per
                  </Typography>
                  <div className="w-[150px]">
                    <PlainSelector
                      dataArr={selectedUnits || []}
                      title={"Upper unit"}
                      handleChange={(e) => {
                        const foundUnit = selectedUnits?.find(
                          (unit) => unit._id === e.target.value
                        );
                        setQuantityRelationToEdit({
                          ...quantityRelationToEdit,
                          upperUnit: foundUnit?.name || "",
                        });
                        setUpperUnit(foundUnit?._id || "");
                      }}
                      selectedValue={upperUnit}
                    />
                  </div>
                </>
              ) : (
                <div
                  key={index}
                  className="flex items-center px-2 md:w-[300px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2"
                >
                  {" "}
                  <Typography
                    variant="body1"
                    className="dark:text-darkText text-whiteText"
                  >
                    {relationdata.quantityRelation} {relationdata.lowerUnit}
                    {"  per  "} {relationdata.upperUnit}
                  </Typography>
                </div>
              )}

              {quantityRelationToEdit && index == currentIndex ? (
                <div className="flex items-center ml-2 space-x-1">
                  <IconButton
                    onClick={() => {
                      setQuantityRelationToEdit(null);
                      setCurrentIndex(-1);
                    }}
                  >
                    <RxCross2 />
                  </IconButton>

                  <IconButton>
                    <MdCheck
                      className="text-green-500"
                      onClick={async () => {
                        try {
                          const updatedRelations = quantityRelations.map(
                            (relation, index) =>
                              index === currentIndex
                                ? quantityRelationToEdit
                                : relation
                          );
                          const data = await trigger({
                            quantityRelations: updatedRelations,
                          });
                          if (data) {
                            toast.success("Successfully updated.");
                            setQuantityRelations(data.quantityRelations);
                            setQuantityRelationToEdit(null);
                            setCurrentIndex(-1);
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
                        setQuantityRelationToEdit(relationdata);
                        setCurrentIndex(index);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <TrashButton
                    handleClick={async () => {
                      if (edit && trigger) {
                        setQuantityRelationToEdit(relationdata);
                        setOpenDeleteDialog(true);
                        setCurrentIndex(index);
                      } else {
                        setQuantityRelations(
                          quantityRelations.filter(
                            (relation) =>
                              !(
                                relation.lowerUnit === relationdata.lowerUnit &&
                                relation.upperUnit === relationdata.upperUnit &&
                                relation.quantityRelation ===
                                  relationdata.quantityRelation
                              )
                          )
                        );
                      }
                    }}
                  />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
      <DeleteDialog
        open={openDeleteDialog}
        handleClose={() => {
          setQuantityRelationToEdit(null);
          setOpenDeleteDialog(false);
          setCurrentIndex(-1);
        }}
        text={"this relation"}
        handleDelete={async () => {
          setDeleteLoading(true);
          const updatedRelations = quantityRelations.filter(
            (relation) =>
              !(
                relation.lowerUnit === quantityRelationToEdit?.lowerUnit &&
                relation.upperUnit === quantityRelationToEdit?.upperUnit &&
                relation.quantityRelation ===
                  quantityRelationToEdit?.quantityRelation
              )
          );
          try {
            const data = await trigger({
              quantityRelations: updatedRelations,
            });
            if (data) {
              setQuantityRelationToEdit(null);
              setOpenDeleteDialog(false);
              setCurrentIndex(-1);
              setQuantityRelations(data.quantityRelations);
              toast.success("Successfully deleted.");
            }
          } catch (error) {
            setDeleteLoading(false);
            toast.error("Something went wrong.");
          }
        }}
        loading={deleteLoading}
      />
    </div>
  );
};

export default QuantityRealtionsDisplay;
