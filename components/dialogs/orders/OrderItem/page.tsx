import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import { getDrugList } from "@/datafetch/medicines/medicines.api";
import { createOrderItem } from "@/datafetch/orders/orders.api";
import config from "@/utils/config";
import { medicineEndPoint, orderEndPoint } from "@/utils/endpoints";
import { buySellUnits } from "@/utils/staticData";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface Props {
  orderInfo: OrderType;
  setOrderInfo: (data: OrderType) => void;
  setShowOrderitemCreate: (data: boolean) => void;
  edit?: boolean;
  id?: string;
}

const OrderItemCreate = ({
  orderInfo,
  setOrderInfo,
  setShowOrderitemCreate,
  edit,
  id,
}: Props) => {
  const [currentOrderItem, setCurrentOrderItem] = useState<OrderItemType>({
    itemName: { _id: "", brandName: "" },
    quantity: 0,
    unit: "",
  });
  const [selectedValue, setSelectedValue] = useState("");
  const [availableMedicines, setAvailableMedicines] = useState<
    { _id: string; brandName: string; stockQuantityUnit: string }[]
  >([]);

  const [brandSearch, setBrandSearch] = useState("");

  const { data: medicinesLists, mutate: medicineMutate } = useSWR(
    `${config.apiBaseUrl}/${medicineEndPoint}/list?search=${brandSearch}`,
    getDrugList
  );

  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}/order-item/${id}`,
    createOrderItem
  );
  useEffect(() => {
    if (medicinesLists) {
      setAvailableMedicines(medicinesLists);
    }
  }, [medicinesLists]);

  return (
    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center space-x-2 mt-2 ">
      <div className="w-full md:w-[300px] ">
        <AutocompleteSearch
          dataArr={availableMedicines}
          dataIndex="brandName"
          handleChange={(e, newValue) => {
            const selectedDrug = availableMedicines.find(
              (medicine: { _id: string; brandName: string }) =>
                medicine.brandName === newValue
            );
            if (selectedDrug) {
              setCurrentOrderItem({
                ...currentOrderItem,
                itemName: selectedDrug,
                unit: selectedDrug.stockQuantityUnit,
              });
              setSelectedValue(
                buySellUnits.find(
                  (selldata) => selldata.name === selectedDrug.stockQuantityUnit
                )?._id || ""
              );
            }
          }}
          handleSearch={(e) => {
            setBrandSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center  justify-between md:justify-start md:space-x-2 w-full md:w-auto">
        <div className=" w-[150px] ">
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
        <div className="w-[80px] md:w-[100px] ml-1 md:ml-0 mr-2 md:mr-0 border-[1px] border-[#9CA3AF] rounded-md h-[50px] pt-3  text-center">
          {currentOrderItem.unit}
        </div>
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
        handleAdd={async () => {
          if (
            currentOrderItem.itemName == "" ||
            currentOrderItem.quantity === 0 ||
            currentOrderItem.unit === ""
          ) {
            return toast.error("Fill all fields.");
          }
          if (edit) {
            try {
              const data = await trigger({
                ...currentOrderItem,
                itemName: (
                  currentOrderItem.itemName as { _id: ""; brandName: "" }
                )._id,
              });
              if (data) {
                toast.success("Successfully created.");
                setOrderInfo({ ...orderInfo, orderItems: data.orderItems });
                setShowOrderitemCreate(false);
              }
            } catch (error) {
              toast.error("Something went wrong.");
            }
          } else {
            setOrderInfo({
              ...orderInfo,
              orderItems: [...orderInfo.orderItems, currentOrderItem],
            });
            setShowOrderitemCreate(false);
          }
        }}
      />
    </div>
  );
};

export default OrderItemCreate;
