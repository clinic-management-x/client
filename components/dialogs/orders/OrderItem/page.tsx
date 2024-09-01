import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import { getDrugList } from "@/datafetch/medicines/medicines.api";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import { buySellUnits } from "@/utils/staticData";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface Props {
  orderInfo: OrderType;
  setOrderInfo: (data: OrderType) => void;
  setShowOrderitemCreate: (data: boolean) => void;
}

const OrderItemCreate = ({
  orderInfo,
  setOrderInfo,
  setShowOrderitemCreate,
}: Props) => {
  const [currentOrderItem, setCurrentOrderItem] = useState<OrderItemType>({
    itemName: { _id: "", brandName: "" },
    quantity: 0,
    unit: "",
  });
  const [availableMedicines, setAvailableMedicines] = useState<
    { _id: string; brandName: string }[]
  >([]);
  const [brandSearch, setBrandSearch] = useState("");

  const { data: medicinesLists, mutate: medicineMutate } = useSWR(
    `${config.apiBaseUrl}/${medicineEndPoint}/list?search=${brandSearch}`,
    getDrugList
  );
  useEffect(() => {
    if (medicinesLists) {
      setAvailableMedicines(medicinesLists);
    }
  }, [medicinesLists]);

  return (
    <div className="flex items-center space-x-2 mt-2 ">
      <div className="w-[300px]">
        <AutocompleteSearch
          dataArr={availableMedicines}
          dataIndex="brandName"
          handleChange={(e, newValue) => {
            const selectedIngredient = availableMedicines.find(
              (medicine: { _id: string; brandName: string }) =>
                medicine.brandName === newValue
            );
            if (selectedIngredient) {
              setCurrentOrderItem({
                ...currentOrderItem,
                itemName: selectedIngredient,
              });
            }
          }}
          handleSearch={(e) => {
            setBrandSearch(e.target.value);
          }}
        />
      </div>
      <div className="w-[150px]">
        <CustomTextField
          value={currentOrderItem?.quantity as number}
          handleChange={(e) => {
            setCurrentOrderItem({
              ...currentOrderItem,
              quantity: +e.target.value,
            });
          }}
          type="number"
        />
      </div>
      <div className="w-[100px]">
        <PlainSelector
          dataArr={buySellUnits}
          title=""
          handleChange={(e, value) => {
            const selectedUnit = buySellUnits.find(
              (unit) => unit._id === e.target.value
            );
            setCurrentOrderItem({
              ...currentOrderItem,
              unit: selectedUnit?.name as string,
            });
          }}
          selectedValue={
            buySellUnits.find(
              (selldata) => selldata.name === currentOrderItem?.unit
            )?._id
          }
        />
      </div>
      <CrossCheckButtonsGroup
        handleCancel={() => {
          setCurrentOrderItem({
            itemName: { _id: "", brandName: "" },
            quantity: 0,
            unit: "",
          });
          setShowOrderitemCreate(false);
        }}
        handleAdd={() => {
          if (
            currentOrderItem.itemName == "" ||
            currentOrderItem.quantity === 0 ||
            currentOrderItem.unit === ""
          ) {
            return toast.error("Fill all fields.");
          }

          setOrderInfo({
            ...orderInfo,
            orderItems: [...orderInfo.orderItems, currentOrderItem],
          });
          setShowOrderitemCreate(false);
        }}
      />
    </div>
  );
};

export default OrderItemCreate;
