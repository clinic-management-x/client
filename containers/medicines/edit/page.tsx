"use client";

import BackButton from "@/components/buttons/BackButton/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  deleteMedicine,
  getMedicine,
  updateMedicineData,
} from "@/datafetch/medicines/medicines.api";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import { buySellUnits, defaultMedicinData, routes } from "@/utils/staticData";
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import SkeletonFrame from "./skeleton";
import toast from "react-hot-toast";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import useSWRMutation from "swr/mutation";
import Ingredient from "./Ingredient";
import Quantity from "./Quantity";
import {
  getImageEditing,
  insertCurrentMedicineId,
} from "@/redux/slices/inventory";
import { useDispatch, useSelector } from "react-redux";
import SellPrices from "./SellPrices";
import DeleteMajorInfo from "@/components/dialogs/delete/DeleteMajorInfo";
import ImageUploads from "@/components/dialogs/medicine/ImageUploads/page";
import ImageEdit from "./image";
import AddButton from "@/components/buttons/AddButton/page";
import QuantityRealtionsDisplay from "@/components/dialogs/medicine/QuantityRelationsDisplay/page";
import QuantityRelationCreate from "@/components/dialogs/medicine/QuantityRelationsCreate/page";

export const defaultShowData = {
  type: "",
  show: false,
};
const EditMedicine = ({ id }: { id: string }) => {
  const isImageEditing = useSelector(getImageEditing);
  const router = useRouter();
  const dispatch = useDispatch();

  const [stockUnit, setStockUnit] = useState("");
  const [alertUnit, setAlertUnit] = useState("");
  const [routeId, setRouteId] = useState(0);
  const [medicine, setMedicine] =
    useState<MedicineTypeCreate>(defaultMedicinData);
  const [showEditButton, setShowEditButton] = useState(defaultShowData);
  const [openDeleteMedicineDialog, setOpenDeleteMedicineDialog] =
    useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState<
    { _id: string; name: string }[]
  >([]);
  const [quantityRelations, setQuantityRelations] = useState<
    QuantityRealtions[]
  >([]);
  const [showQuantiyRelationCreate, setShowQuantityRelationCreate] =
    useState(false);

  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${medicineEndPoint}/${id}`,
    getMedicine
  );

  const { trigger, isMutating: updateMedicineMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}/${id}`,
    updateMedicineData
  );

  const processData = (data: MedicineTypeStandard) => {
    const info = {
      ...data,
      genericDrug: data.genericDrug.genericName,
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
    };
    const units = data.sellPrices.map((sellprice, index) => {
      return { _id: `${index + 1}`, name: sellprice.unit };
    });
    setSelectedUnits(units);
    setQuantityRelations(data.quantityRelations || []);

    setMedicine(info);
    setRouteId(
      routes.find((route) => route.name === data.routeOfAdministration)
        ?._id as number
    );
    setStockUnit(
      buySellUnits.find((unit) => unit.name === data.stockQuantityUnit)?._id ||
        ""
    );
    setAlertUnit(
      buySellUnits.find((unit) => unit.name === data.minimumAlertQuantityUnit)
        ?._id || ""
    );
  };
  useEffect(() => {
    if (data && !isImageEditing) {
      processData({ ...data.medicine, imageUrls: data.imageArray });
    }
  }, [data]);

  const updateMedicine = async (keyname: string) => {
    try {
      const payload =
        keyname === "quantities"
          ? {
              stockQuantity: medicine.stockQuantity,
              stockQuantityUnit: medicine.stockQuantityUnit,
              minimumAlertQuantity: medicine.minimumAlertQuantity,
              minimumAlertQuantityUnit: medicine.minimumAlertQuantityUnit,
            }
          : {
              [keyname]: medicine[keyname as keyof MedicineTypeCreate],
            };
      const data = await trigger(payload as MedicineTypeUpdate);

      if (data) {
        toast.success("Successfully updated.");
        keyname === "quantities"
          ? {
              ...medicine,
              stockQuantity: data.stockQuantity,
              stockQuantityUnit: data.stockQuantityUnit,
              minimumAlertQuantity: data.minimumAlertQuantity,
              minimumAlertQuantityUnit: data.minimumAlertQuantityUnit,
            }
          : setMedicine({ ...medicine, [keyname]: data[keyname] });
        setShowEditButton(defaultShowData);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col  ">
      <Box sx={{ mb: 50 }}>
        <BackButton
          handleClick={() => {
            dispatch(insertCurrentMedicineId(""));
            router.push("/backoffice/inventory/medicines");
          }}
        />
        {isLoading ? (
          <SkeletonFrame />
        ) : (
          <div className="flex flex-col ml-4 md:ml-14 w-full">
            <div className="flex flex-col mx-2 md:w-[300px]">
              <LabelTypography title="Brand Name" />
              <CustomTextField
                value={medicine?.brandName}
                handleChange={(e) => {
                  setShowEditButton({ type: "brandname", show: true });
                  setMedicine({
                    ...medicine,
                    brandName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-[300px] text-start">
              <DetailEditCancelButton
                show={showEditButton.show && showEditButton.type == "brandname"}
                handleCancel={() => {
                  setMedicine({ ...medicine, brandName: data.brandName });
                  setShowEditButton(defaultShowData);
                }}
                handleUpdate={() => {
                  updateMedicine("brandName");
                }}
                loading={updateMedicineMutating}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px] my-2">
              <LabelTypography title="Generic Name" />
              <CustomTextField
                value={medicine?.genericDrug}
                handleChange={(e) => {
                  toast.error("Generic name can't be edited after creation.");
                }}
              />
            </div>
            <Ingredient medicine={medicine} setMedicine={setMedicine} />

            <div className="flex flex-col mx-2 md:w-[300px] mb-2">
              <LabelTypography title="Routes of Administration" />
              <PlainSelector
                dataArr={routes}
                title=""
                handleChange={(e, value) => {
                  setShowEditButton({ show: true, type: "roa" });
                  setRouteId(e.target.value);
                  const selectedUnit = routes.find(
                    (unit) => unit._id === e.target.value
                  );
                  setMedicine({
                    ...medicine,
                    routeOfAdministration: selectedUnit?.name || "",
                  });
                }}
                selectedValue={routeId}
              />
            </div>
            <div className="w-[300px] text-start">
              <DetailEditCancelButton
                show={showEditButton.show && showEditButton.type == "roa"}
                handleCancel={() => {
                  setMedicine({
                    ...medicine,
                    routeOfAdministration: data.routeOfAdministration,
                  });
                  setRouteId(
                    routes.find(
                      (route) => route.name === data.routeOfAdministration
                    )?._id as number
                  );
                  setShowEditButton(defaultShowData);
                }}
                handleUpdate={() => {
                  updateMedicine("routeOfAdministration");
                }}
                loading={updateMedicineMutating}
              />
            </div>
            <SellPrices
              medicine={medicine}
              setMedicine={setMedicine}
              selectedUnits={selectedUnits}
              setSelectedUnits={setSelectedUnits}
            />

            {medicine.sellPrices.length > 1 ? (
              <>
                <div className="flex flex-col  mx-2">
                  <LabelTypography title="Quantity Relations" />
                  <Typography
                    variant="caption"
                    className="dark:text-darkText text-whiteText mb-2"
                  >
                    In order to get precise calculation, give the relation
                    between sell units. (eg.1 BOX - 30 CARD)
                  </Typography>
                  {quantityRelations.length ? (
                    <QuantityRealtionsDisplay
                      quantityRelations={quantityRelations}
                      setQuantityRelations={setQuantityRelations}
                      selectedUnits={selectedUnits}
                      edit={true}
                      trigger={trigger}
                    />
                  ) : (
                    <></>
                  )}
                  {showQuantiyRelationCreate ? (
                    <QuantityRelationCreate
                      quantityRelations={quantityRelations}
                      setQuantityRelations={setQuantityRelations}
                      selectedUnits={selectedUnits}
                      setShowQuantityRelationCreate={
                        setShowQuantityRelationCreate
                      }
                      trigger={trigger}
                      edit={true}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {!showQuantiyRelationCreate ? (
                  <div className="ml-2">
                    <AddButton
                      handleClick={() => {
                        setShowQuantityRelationCreate(true);
                      }}
                    />{" "}
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <Divider sx={{ my: 4 }} />

            <Quantity
              medicine={medicine}
              setMedicine={setMedicine}
              data={data}
              updateMedicine={updateMedicine}
              updateMedicineMutating={updateMedicineMutating}
              setAlertUnit={setAlertUnit}
              setStockUnit={setStockUnit}
              alertUnit={alertUnit}
              stockUnit={stockUnit}
              showEditButton={showEditButton}
              setShowEditButton={setShowEditButton}
            />
            <div className="ml-2">
              <LabelTypography title="Images" />
            </div>
            <ImageEdit
              basicMedicineInfo={medicine}
              setBasicMedicineInfo={setMedicine}
              edit={true}
              imageArray={data?.imageArray}
            />
          </div>
        )}
        <Typography
          className="text-slate-500 dark:text-darkText underline ml-2 lg:ml-20 mt-10"
          onClick={() => {
            setOpenDeleteMedicineDialog(true);
          }}
        >
          Delete Medicine
        </Typography>
      </Box>
      <DeleteMajorInfo
        open={openDeleteMedicineDialog}
        handleClose={() => {
          setOpenDeleteMedicineDialog(false);
        }}
        handleDelete={async () => {
          try {
            setDeleteLoading(true);
            const data = await deleteMedicine(
              `${config.apiBaseUrl}/${medicineEndPoint}/${id}`
            );
            if (data) {
              toast.success("Successfully Deleted.");
              router.push(`${config.nextUrl}/backoffice/inventory/medicines`);
              setDeleteLoading(false);
            }
          } catch (error) {
            setDeleteLoading(false);
            toast.error("Something went wrong");
          }
        }}
        loading={deleteLoading}
        text1="Medicine"
        text2="Deleting the medicine will remove all of the medicine's information from
          our databse.This cannot be undone."
      />
    </section>
  );
};

export default EditMedicine;
