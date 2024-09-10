import AddButton from "@/components/buttons/AddButton/page";
import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import TrashButton from "@/components/buttons/TrashButton/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { createBarcode } from "@/datafetch/medicines/medicines.api";
import { getOrders } from "@/datafetch/orders/orders.api";
import config from "@/utils/config";
import { medicineEndPoint, orderEndPoint } from "@/utils/endpoints";
import { defaultBarcode } from "@/utils/staticData";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface Props {
  open: boolean;
  handleClose: () => void;
  //mutate: any;
}

const CreateBarcodeDialog = ({ open, handleClose }: Props) => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [medicines, setMedicines] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [currentBarcodeData, setCurrentBarcodeData] =
    useState<Barcode>(defaultBarcode);
  const [barcodeDataArr, setBarcodeDataArr] = useState<Barcode[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const { data, mutate, isLoading } = useSWR(
    `${
      config.apiBaseUrl
    }/${orderEndPoint}/valid?skip=${0}&limit=${8}&search=${search}`,
    getOrders
  );

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}/barcodes`,
    createBarcode
  );

  useEffect(() => {
    if (data) {
      setOrders(data.data);
    }
  }, [data]);

  const handleCreate = async () => {
    if (selectedOrder) {
      for (let i = 0; i < selectedOrder?.orderItems.length; i++) {
        const validOrders = barcodeDataArr.filter(
          (barcodedata) =>
            barcodedata.medicine ==
            (selectedOrder.orderItems[i].itemName as ItemNameType)._id
        );
        const totalQuantity = validOrders.reduce(
          (acc, curr) => (acc += curr.quantity),
          0
        );
        if (totalQuantity !== selectedOrder.orderItems[i].quantity) {
          return toast.error("Please make sure all order items are filled.");
        }
      }
    }
    try {
      const modifiedArr = barcodeDataArr.map((dataarr) => {
        delete dataarr._id;
        return dataarr;
      });
      const data = await trigger(modifiedArr);
      if (data) {
        toast.success("Successfully created.");
        closeDialog();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const clearData = () => {
    setCurrentBarcodeData(defaultBarcode);
    setShowCreate(false);
    setSelectedMedicine("");
    setSelectedDate(null);
  };
  const closeDialog = () => {
    handleClose();
    setCurrentBarcodeData(defaultBarcode);
    setMedicines([]);
    setBarcodeDataArr([]);
    setSelectedDate(null);
  };

  const alreadySelectedQuantity = barcodeDataArr
    .filter((orderitem) => orderitem.medicine === currentBarcodeData.medicine)
    .reduce((acc, curr) => (acc += curr.quantity), 0);

  const totalQuantity = selectedOrder?.orderItems.find(
    (orderitem) =>
      (orderitem.itemName as ItemNameType)._id == currentBarcodeData.medicine
  )?.quantity as number;

  const validQuantity = isNaN(totalQuantity)
    ? 0
    : alreadySelectedQuantity
    ? totalQuantity - alreadySelectedQuantity
    : totalQuantity;

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
              <LabelTypography title="Select Order Id" />
              <AutocompleteSearch
                dataArr={orders}
                dataIndex="batchId"
                handleChange={(e, newValue) => {
                  const chosenOrder = orders?.find(
                    (orderdata) => orderdata.batchId === newValue
                  );
                  if (chosenOrder) {
                    setSelectedOrder(chosenOrder);
                    setMedicines(
                      chosenOrder.orderItems?.map((item: any) => {
                        return {
                          _id: item.itemName._id,
                          name: item.itemName.brandName,
                        };
                      })
                    );
                  }
                }}
                handleSearch={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>

            {medicines?.length ? (
              <div className="flex flex-col  mx-2  mt-4">
                <LabelTypography title="Sort Order Items By Expired Date" />
                {barcodeDataArr.length ? (
                  <div className="">
                    {barcodeDataArr.map((data, index) => (
                      <div className="flex items-center mb-2">
                        <div
                          key={index}
                          className="flex items-center  border-[1px] md:w-[400px] p-2 border-[#9CA3AF] rounded-md "
                        >
                          <div className="flex flex-col w-[150px]   mb-2">
                            {dayjs(data?.expiredDate).format("DD-MM-YYYY")}
                          </div>
                          <div className="mb-2 w-[50px] mr-6">
                            <MdKeyboardDoubleArrowRight size={24} />
                          </div>
                          <div className="flex  mb-2">
                            {
                              medicines.find(
                                (medicine) => medicine._id === data.medicine
                              )?.name
                            }
                            <br></br>
                            {data.quantity} {data.unit}
                          </div>
                        </div>
                        <TrashButton
                          handleClick={() => {
                            setBarcodeDataArr(
                              barcodeDataArr.filter(
                                (arrdata) => arrdata._id !== data._id
                              )
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                {showCreate ? (
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="flex flex-col  md:w-[150px]  mb-2">
                      <LabelTypography title="Expired date" />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={selectedDate}
                          disablePast
                          onChange={(value) => {
                            setSelectedDate(value);
                            setCurrentBarcodeData({
                              ...currentBarcodeData,
                              expiredDate: dayjs(value).toISOString(),
                            });
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="flex flex-col  md:w-[150px]  mb-2">
                      <LabelTypography title="Item Name" />
                      <PlainSelector
                        dataArr={medicines}
                        title={""}
                        handleChange={(e, value) => {
                          setSelectedMedicine(e.target.value);
                          if (currentBarcodeData) {
                            setCurrentBarcodeData({
                              ...currentBarcodeData,
                              medicine: e.target.value,
                              unit:
                                selectedOrder?.orderItems.find(
                                  (item) =>
                                    (item.itemName as ItemNameType)._id ===
                                    e.target.value
                                )?.unit || "",
                            });
                          }
                        }}
                        selectedValue={selectedMedicine}
                      />
                    </div>
                    <div className="flex flex-col  md:w-[150px]  mb-2">
                      <LabelTypography
                        title={`Available Qty (${validQuantity})`}
                      />
                      <CustomTextField
                        type="number"
                        value={currentBarcodeData?.quantity || 0}
                        handleChange={(e) => {
                          if (Number(e.target.value) > validQuantity) {
                            return toast.error("Quantity is invalid.");
                          }
                          setCurrentBarcodeData({
                            ...currentBarcodeData,
                            quantity: Number(e.target.value),
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col  md:w-[150px]  mb-2">
                      <LabelTypography title="Unit" />
                      <div className=" border-[1px] w-[80px]  h-[50px] py-3 rounded-md text-center border-[#9CA3AF]">
                        {currentBarcodeData.unit}
                      </div>
                    </div>
                    <div className="mt-4 ">
                      <CrossCheckButtonsGroup
                        handleCancel={clearData}
                        handleAdd={async () => {
                          if (
                            currentBarcodeData.medicine === "" ||
                            currentBarcodeData.quantity === 0 ||
                            currentBarcodeData.expiredDate == ""
                          ) {
                            return toast.error(
                              "Fill all required informations."
                            );
                          }

                          setBarcodeDataArr([
                            ...barcodeDataArr,
                            {
                              ...currentBarcodeData,
                              _id: `${barcodeDataArr.length + 1}`,
                            },
                          ]);
                          clearData();
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="ml-2">
                  <AddButton
                    handleClick={() => {
                      setCurrentBarcodeData({
                        ...currentBarcodeData,
                        orderId: selectedOrder?._id || "",
                        batchId: selectedOrder?.batchId || "",
                      });
                      setShowCreate(true);
                    }}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={false}
            isLoading={createMutating}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBarcodeDialog;
