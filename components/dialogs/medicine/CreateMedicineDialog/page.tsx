"use client";

import AddButton from "@/components/buttons/AddButton/page";
import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  createMedicine,
  getActiveIngridients,
  getGenericDrugNames,
} from "@/datafetch/medicines/medicines.api";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import {
  buySellUnits,
  defaultMedicinData,
  routes,
  units,
} from "@/utils/staticData";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import IngredientDiplay from "../IngredientDisplay/page";
import IngredientCreate from "../IngredientCreate/page";
import SellUnitCreate from "../SellUnitCreate/page";
import SellUnitDisplay from "../SellUnitDisplay/page";
import ImageUploads from "../ImageUploads/page";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getImageUploading } from "@/redux/slices/inventory";
import QuantityRelationCreate from "../QuantityRelationsCreate/page";
import QuantityRealtionsDisplay from "../QuantityRelationsDisplay/page";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: any;
}

export interface QuantityRealtions {
  upperUnit: string;
  lowerUnit: string;
  quantityRelation: number;
}

const CreateMedicineDialog = ({ open, handleClose, mutate }: Props) => {
  const imageUploading = useSelector(getImageUploading);
  const [genericDrugs, setGenericDrugs] = useState<
    { _id: string; genericName: string }[]
  >([]);
  const [activeIngredients, setActiveIngredients] = useState<
    { _id: string; activeIngredientName: string }[]
  >([]);
  const [genericSearch, setGenericSearch] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [basicMedicineInfo, setBasicMedicineInfo] =
    useState<MedicineTypeCreate>(defaultMedicinData);
  const [showIngredient, setShowIngredient] = useState(false);
  const [showSellUnits, setShowSellUnits] = useState(false);
  const [stockUnit, setStockUnit] = useState("");
  const [alertUnit, setAlertUnit] = useState("");
  const [routeId, setRouteId] = useState(0);
  const [selectedUnits, setSelectedUnits] = useState<
    { _id: string; name: string }[]
  >([]);
  const [quantityRelations, setQuantityRelations] = useState<
    QuantityRealtions[]
  >([]);
  const [showQuantiyRelationCreate, setShowQuantityRelationCreate] =
    useState(false);

  const { data: genericDrugData } = useSWR(
    `${config.apiBaseUrl}/${medicineEndPoint}/generic-drugs?search=${genericSearch}`,
    getGenericDrugNames
  );

  const { data: activeIngredientsData, mutate: ingredientMutate } = useSWR(
    `${config.apiBaseUrl}/${medicineEndPoint}/active-ingredients?search=${ingredientSearch}`,
    getActiveIngridients
  );

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}`,
    createMedicine
  );

  useEffect(() => {
    if (genericSearch.length > 4) {
      mutate();
    }
  }, [genericSearch]);

  useEffect(() => {
    if (ingredientSearch.length > 4) {
      mutate();
    }
  }, [ingredientSearch]);

  useEffect(() => {
    if (genericDrugData) {
      setGenericDrugs(genericDrugData);
    } else {
      setGenericDrugs([]);
    }
  }, [genericDrugData]);

  useEffect(() => {
    if (activeIngredientsData) {
      setActiveIngredients(activeIngredientsData);
    }
  }, [activeIngredientsData]);
  const handleCreate = async () => {
    try {
      const payload = { ...basicMedicineInfo, quantityRelations };
      const response = await trigger(payload);
      if (response) {
        mutate();
        toast.success("Successfully created.");
        closeDialog();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const closeDialog = () => {
    handleClose();
    setBasicMedicineInfo(defaultMedicinData);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="paper"
      open={open}
      onClose={closeDialog}
    >
      <DialogContent
        dividers={true}
        className="flex flex-col dark:bg-[#3C3C3C]"
      >
        <Box className="flex flex-col md:flex-row">
          <CloseButton handleClose={closeDialog} />
          <Box
            className={`w-full  ${
              false
                ? "md:w-[100%] md:mt-0 lg:mt-2 lg:w-[70%] mt-0"
                : "md:w-[100%] mt-4"
            } mr-2`}
          >
            <div className="flex flex-col mx-2 md:w-[300px]">
              <LabelTypography title="Brand Name" />
              <CustomTextField
                value={basicMedicineInfo.brandName}
                handleChange={(e) => {
                  setBasicMedicineInfo({
                    ...basicMedicineInfo,
                    brandName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px] my-2">
              <LabelTypography title="Generic Name" />
              <AutocompleteSearch
                dataArr={genericDrugs}
                dataIndex="genericName"
                handleChange={(e, newValue) => {
                  const selectedDrug = genericDrugs.find(
                    (genericDrug) => genericDrug["genericName"] === newValue
                  );
                  if (selectedDrug) {
                    setBasicMedicineInfo({
                      ...basicMedicineInfo,
                      genericDrug: selectedDrug._id,
                    });
                  }
                }}
                handleSearch={(e) => {
                  setGenericSearch(e.target.value);
                }}
              />
            </div>
            <div className="ml-2">
              <LabelTypography title="Active Ingredients" />
            </div>
            <div className="ml-2">
              <IngredientDiplay
                activeIngredients={basicMedicineInfo.activeIngredients}
                basicMedicineInfo={basicMedicineInfo}
                setBasicMedicineInfo={setBasicMedicineInfo}
              />
            </div>
            {showIngredient ? (
              <IngredientCreate
                activeIngredients={activeIngredients}
                basicMedicineInfo={basicMedicineInfo}
                setBasicMedicineInfo={setBasicMedicineInfo}
                setIngredientSearch={setIngredientSearch}
                setShowIngredient={setShowIngredient}
              />
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

            <div className="flex flex-col mx-2 md:w-[300px] mb-2">
              <LabelTypography title="Routes of Administration" />
              <PlainSelector
                dataArr={routes}
                title=""
                handleChange={(e, value) => {
                  setRouteId(e.target.value);
                  const selectedUnit = routes.find(
                    (unit) => unit._id === e.target.value
                  );
                  setBasicMedicineInfo({
                    ...basicMedicineInfo,
                    routeOfAdministration: selectedUnit?.name || "",
                  });
                }}
                selectedValue={routeId}
              />
            </div>
            <div className="ml-2">
              <LabelTypography title="Sell" />
            </div>
            <SellUnitDisplay
              sellPrices={basicMedicineInfo.sellPrices}
              basicMedicineInfo={basicMedicineInfo}
              setBasicMedicineInfo={setBasicMedicineInfo}
              edit={false}
            />

            {showSellUnits ? (
              <SellUnitCreate
                basicMedicineInfo={basicMedicineInfo}
                setBasicMedicineInfo={setBasicMedicineInfo}
                setShowSellUnits={setShowSellUnits}
                selectedUnits={selectedUnits}
                setSelectedUnits={setSelectedUnits}
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
            {basicMedicineInfo.sellPrices.length > 1 ? (
              <>
                <div className="flex flex-col  mx-2">
                  <LabelTypography title="Quantity Relations" />
                  <Typography variant="caption">
                    In order to get precise calculation, give the relation
                    between sell units. (eg.1 BOX - 30 CARD)
                  </Typography>
                  {quantityRelations.length ? (
                    <QuantityRealtionsDisplay
                      quantityRelations={quantityRelations}
                      setQuantityRelations={setQuantityRelations}
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
            <div className="flex flex-col md:flex-row items-center mx-2 my-2">
              <div className="flex flex-col  md:w-[180px]">
                <LabelTypography title="Total Quantity" />
                <CustomTextField
                  value={basicMedicineInfo.stockQuantity}
                  handleChange={(e) => {
                    setBasicMedicineInfo({
                      ...basicMedicineInfo,
                      stockQuantity: +e.target.value,
                    });
                  }}
                  type="number"
                />
              </div>
              <div className="flex flex-col mx-2 md:w-[100px]">
                <LabelTypography title="Unit" />
                <PlainSelector
                  dataArr={buySellUnits}
                  title=""
                  handleChange={(e, value) => {
                    setStockUnit(e.target.value);
                    const selectedUnit = buySellUnits.find(
                      (unit) => unit._id === e.target.value
                    );
                    setBasicMedicineInfo({
                      ...basicMedicineInfo,
                      minimumAlertQuantityUnit: selectedUnit?.name || "",
                    });
                  }}
                  selectedValue={stockUnit}
                />
              </div>
              <div className="flex flex-col mx-2 md:w-[180px]">
                <LabelTypography title="Minimum Alert Quantity" />
                <CustomTextField
                  value={basicMedicineInfo.minimumAlertQuantity}
                  handleChange={(e) => {
                    setBasicMedicineInfo({
                      ...basicMedicineInfo,
                      minimumAlertQuantity: +e.target.value,
                    });
                  }}
                  type="number"
                />
              </div>
              <div className="flex flex-col mx-2 md:w-[100px]">
                <LabelTypography title="Unit" />
                <PlainSelector
                  dataArr={buySellUnits}
                  title=""
                  handleChange={(e, value) => {
                    setAlertUnit(e.target.value);
                    const selectedUnit = buySellUnits.find(
                      (unit) => unit._id === e.target.value
                    );
                    setBasicMedicineInfo({
                      ...basicMedicineInfo,
                      minimumAlertQuantityUnit: selectedUnit?.name || "",
                    });
                  }}
                  selectedValue={alertUnit}
                />
              </div>
            </div>
            <div className="ml-2">
              <LabelTypography title="Images" />
            </div>
            <ImageUploads
              basicMedicineInfo={basicMedicineInfo}
              setBasicMedicineInfo={setBasicMedicineInfo}
              edit={false}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={
              basicMedicineInfo.brandName == "" ||
              basicMedicineInfo.genericDrug == "" ||
              !basicMedicineInfo.stockQuantity ||
              !basicMedicineInfo.minimumAlertQuantity ||
              imageUploading
            }
            isLoading={createMutating}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMedicineDialog;
