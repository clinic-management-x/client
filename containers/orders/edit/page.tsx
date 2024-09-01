"use client";
import BackButton from "@/components/buttons/BackButton/page";
import { checkOverlapBatchId, getOrder } from "@/datafetch/orders/orders.api";
import config from "@/utils/config";
import { orderEndPoint } from "@/utils/endpoints";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import SkeletonFrame from "./skeleton";
import {
  defaultOrderData,
  orderStatus,
  paymentMethods,
} from "@/utils/staticData";
import LabelTypography from "@/components/typography/LabelTypography/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import CheckTextField from "@/components/input/CheckTextField/page";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import dayjs from "dayjs";
import RadioGroupSelector from "@/components/input/RadioGroup/page";
import DeleteMajorInfo from "@/components/dialogs/delete/DeleteMajorInfo";
import OrderItemsDisplay from "@/components/dialogs/orders/OrderItemDisplay/page";
import OrderItemCreate from "@/components/dialogs/orders/OrderItem/page";
import AddButton from "@/components/buttons/AddButton/page";

const EditOrder = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<OrderType>(defaultOrderData);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [batchIdLoading, setBatchIdLoading] = useState(false);
  const [showOrderItemCreate, setShowOrderitemCreate] = useState(false);
  const [openDeleteOrderDialog, setOpenDeleteOrderDialog] = useState(false);
  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${orderEndPoint}/${id}`,
    getOrder
  );

  const { trigger: batchIdTrigger } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}/search`,
    checkOverlapBatchId
  );

  useEffect(() => {
    if (data) {
      setOrderInfo(data);
    }
  }, [data]);

  return (
    <section className="flex flex-col  ">
      <Box sx={{ mb: 50 }}>
        <BackButton
          handleClick={() => {
            router.push("/backoffice/inventory/orders");
          }}
        />
        {isLoading ? (
          <SkeletonFrame />
        ) : (
          <div className="flex flex-col ml-4 md:ml-14 w-full">
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
              <CustomTextField
                value={(orderInfo.supplier as SupplierCompanyType).name}
                handleChange={() => {
                  toast.error(
                    "Supplier name can't be changed once it is created."
                  );
                }}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px]  mb-2">
              <LabelTypography title="Estimate Date of Arrival" />
              <CustomTextField
                value={dayjs(orderInfo.estimateDate).format("DD-MM-YYYY")}
                handleChange={() => {
                  toast.error(
                    "Estimate date can't be changed once it is created."
                  );
                }}
              />
            </div>
            <div className="flex flex-col mx-2 mb-2">
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

            <Typography
              className="text-slate-500 dark:text-darkText underline ml-2  mt-10"
              onClick={() => {
                setOpenDeleteOrderDialog(true);
              }}
            >
              Delete Order
            </Typography>
          </div>
        )}
        <DeleteMajorInfo
          open={openDeleteOrderDialog}
          handleClose={() => {
            setOpenDeleteOrderDialog(false);
          }}
          handleDelete={async () => {
            try {
            } catch (error) {
              toast.error("Something went wrong");
            }
          }}
          loading={false}
          text1="order"
          text2="Deleting the order will remove all of the order's information from
          our databse.This cannot be undone."
        />
      </Box>
    </section>
  );
};

export default EditOrder;
