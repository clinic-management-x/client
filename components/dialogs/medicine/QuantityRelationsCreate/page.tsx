import React, { useState } from "react";
import { QuantityRealtions } from "../CreateMedicineDialog/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import { Typography } from "@mui/material";
import CustomTextField from "@/components/input/CustomTextField/page";
import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import toast from "react-hot-toast";

interface Props {
  quantityRelations: QuantityRealtions[];
  setQuantityRelations: (data: QuantityRealtions[]) => void;
  selectedUnits: { _id: string; name: string }[];
  setShowQuantityRelationCreate: (data: boolean) => void;
  edit?: boolean;
  trigger?: any;
}
const QuantityRelationCreate = ({
  quantityRelations,
  setQuantityRelations,
  selectedUnits,
  setShowQuantityRelationCreate,
  edit,
  trigger,
}: Props) => {
  const [currentQuantityRelation, setCurrentQuantityRelation] =
    useState<QuantityRealtions>({
      upperUnit: "",
      lowerUnit: "",
      quantityRelation: 0,
    });
  const [lowerUnit, setLowerUnit] = useState("");
  const [upperUnit, setUpperUnit] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col md:flex-row items-center md:space-x-2 mt-2">
      <div className="w-full md:w-[120px]">
        <CustomTextField
          value={currentQuantityRelation.quantityRelation}
          handleChange={(e) => {
            setCurrentQuantityRelation({
              ...currentQuantityRelation,
              quantityRelation: +e.target.value,
            });
          }}
          className="w-full"
        />
      </div>
      <div className="w-full mt-2 md:mt-0 md:w-[150px]">
        <PlainSelector
          dataArr={selectedUnits}
          title={"Lower unit"}
          handleChange={(e) => {
            const foundUnit = selectedUnits.find(
              (unit) => unit._id === e.target.value
            );

            setCurrentQuantityRelation({
              ...currentQuantityRelation,
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
      <div className="w-full md:w-[150px]">
        <PlainSelector
          dataArr={selectedUnits}
          title={"Upper unit"}
          handleChange={(e) => {
            const foundUnit = selectedUnits.find(
              (unit) => unit._id === e.target.value
            );
            setCurrentQuantityRelation({
              ...currentQuantityRelation,
              upperUnit: foundUnit?.name || "",
            });
            setUpperUnit(foundUnit?._id || "");
          }}
          selectedValue={upperUnit}
        />
      </div>
      <CrossCheckButtonsGroup
        handleCancel={() => {
          setCurrentQuantityRelation({
            upperUnit: "",
            lowerUnit: "",
            quantityRelation: 0,
          });
          setShowQuantityRelationCreate(false);
        }}
        isLoading={loading}
        handleAdd={async () => {
          if (
            currentQuantityRelation.quantityRelation == 0 ||
            currentQuantityRelation.lowerUnit === "" ||
            currentQuantityRelation.upperUnit === ""
          ) {
            return toast.error("Fill all required informations.");
          }
          if (edit && trigger) {
            try {
              setLoading(true);
              const data = await trigger({
                quantityRelations: [
                  ...quantityRelations,
                  currentQuantityRelation,
                ],
              });
              if (data) {
                toast.success("Successfully created.");
                setQuantityRelations(data.quantityRelations);
                setCurrentQuantityRelation({
                  upperUnit: "",
                  lowerUnit: "",
                  quantityRelation: 0,
                });
                setLoading(false);
                setShowQuantityRelationCreate(false);
              }
            } catch (error) {
              setLoading(false);
              toast.error("Something went wrong.");
            }
          } else {
            setQuantityRelations([
              ...quantityRelations,
              currentQuantityRelation,
            ]);
            setCurrentQuantityRelation({
              upperUnit: "",
              lowerUnit: "",
              quantityRelation: 0,
            });
            setShowQuantityRelationCreate(false);
          }
        }}
      />
    </div>
  );
};

export default QuantityRelationCreate;
