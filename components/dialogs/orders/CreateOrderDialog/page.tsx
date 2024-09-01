import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import CheckTextField from "@/components/input/CheckTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  checkOverlapBatchId,
  createOrder,
} from "@/datafetch/orders/orders.api";
import { getSuppliersList } from "@/datafetch/supplier/supplier.api";
import config from "@/utils/config";
import { orderEndPoint, supplierEndPoint } from "@/utils/endpoints";
import {
  buySellUnits,
  defaultOrderData,
  orderStatus,
  paymentMethods,
} from "@/utils/staticData";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RadioGroupSelector from "@/components/input/RadioGroup/page";
import OrderItemCreate from "../OrderItem/page";
import AddButton from "@/components/buttons/AddButton/page";
import OrderItemsDisplay from "../OrderItemDisplay/page";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: any;
}

const CreateOrderDialog = ({ open, handleClose, mutate }: Props) => {
  const [suppliers, setSuppliers] = useState<{ _id: string; name: string }[]>(
    []
  );

  const [orderInfo, setOrderInfo] = useState<OrderType>(defaultOrderData);
  const [showOrderItemCreate, setShowOrderitemCreate] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [batchIdLoading, setBatchIdLoading] = useState(false);
  const [arrivalTime, setArrivalTime] = useState<Dayjs | null>(null);

  const { data: supplierLists } = useSWR(
    `${config.apiBaseUrl}/${supplierEndPoint}/list`,
    getSuppliersList
  );

  const { trigger: batchIdTrigger } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}/search`,
    checkOverlapBatchId
  );

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}`,
    createOrder
  );

  const closeDialog = () => {
    handleClose();
    setOrderInfo(defaultOrderData);
    setArrivalTime(null);
  };
  useEffect(() => {
    if (supplierEndPoint) {
      setSuppliers(supplierLists);
    }
  }, [supplierLists]);

  const handleCreate = async () => {
    const payload = {
      ...orderInfo,
      orderItems: orderInfo.orderItems.map((orderitem) => {
        return {
          ...orderitem,
          itemName: (orderitem.itemName as unknown as OrderItemType)._id,
        };
      }),
    };

    try {
      const data = await trigger(orderInfo);
      if (data) {
        mutate();
        toast.success("Successfully created.");
        closeDialog();
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
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
            <div className="flex flex-col mx-2 md:w-[300px]  mb-2">
              <LabelTypography title="BatchId" />

              <div className="relative">
                <CheckTextField
                  value={orderInfo.batchId}
                  handleChange={(e) => {
                    setOrderInfo({ ...orderInfo, batchId: e.target.value });
                  }}
                  className="md:w-[300px]"
                  alreadyExist={alreadyExist}
                  handleBlur={async () => {
                    try {
                      setBatchIdLoading(true);
                      const isAlreadyExist = await batchIdTrigger({
                        batchId: orderInfo.batchId,
                      });

                      if (isAlreadyExist) {
                        setAlreadyExist(isAlreadyExist);
                        toast.error("Batch Id must be unique.");
                      } else {
                        setAlreadyExist(false);
                      }
                      setBatchIdLoading(false);
                    } catch (error) {
                      setBatchIdLoading(false);
                      toast.error("Something went wrong");
                    }
                  }}
                />
                {batchIdLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "10%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col mx-2 md:w-[300px] mb-2">
              <LabelTypography title="Suppliers" />
              <PlainSelector
                dataArr={suppliers}
                title=""
                handleChange={(e, value) => {
                  setOrderInfo({ ...orderInfo, supplier: e.target.value });
                }}
                selectedValue={orderInfo.supplier}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px]  mb-2">
              <LabelTypography title="Estimate Date of Arrival" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={arrivalTime}
                  onChange={(value) => {
                    setArrivalTime(value);
                    setOrderInfo({
                      ...orderInfo,
                      estimateDate: value?.toISOString() as string,
                    });
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="flex flex-col mx-2  mb-2">
              <LabelTypography title="Order Items" />
              <OrderItemsDisplay
                orderInfo={orderInfo}
                setOrderInfo={setOrderInfo}
              />
              {showOrderItemCreate ? (
                <OrderItemCreate
                  setShowOrderitemCreate={setShowOrderitemCreate}
                  orderInfo={orderInfo}
                  setOrderInfo={setOrderInfo}
                />
              ) : (
                <></>
              )}

              <div className={`${showOrderItemCreate ? "hidden" : "ml-2"}`}>
                <AddButton
                  handleClick={() => {
                    setShowOrderitemCreate(true);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mx-2 md:w-[300px] mb-2">
              <LabelTypography title="Payment Method" />
              <RadioGroupSelector
                dataArr={paymentMethods}
                infodata={orderInfo.paymentMethod}
                handleChange={(e) => {
                  setOrderInfo({ ...orderInfo, paymentMethod: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px] mb-2">
              <LabelTypography title="Order Status" />
              <RadioGroupSelector
                dataArr={orderStatus}
                infodata={orderInfo.orderStatus}
                handleChange={(e) => {
                  setOrderInfo({ ...orderInfo, orderStatus: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px] mb-2">
              <LabelTypography title="Has Already Arrived?" />
              <RadioGroupSelector
                dataArr={[
                  { id: 1, label: "YES" },
                  { id: 2, label: "NO" },
                ]}
                infodata={orderInfo.hasAlreadyArrived ? "YES" : "NO"}
                handleChange={(e) => {
                  setOrderInfo({
                    ...orderInfo,
                    hasAlreadyArrived: e.target.value === "YES" ? true : false,
                  });
                }}
              />
            </div>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={
              alreadyExist ||
              orderInfo.supplier === "" ||
              orderInfo.batchId === "" ||
              orderInfo.orderItems.length === 0
            }
            isLoading={createMutating}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrderDialog;
