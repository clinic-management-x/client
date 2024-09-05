import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import RadioGroupSelector from "@/components/input/RadioGroup/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { orderStatus, paymentMethods } from "@/utils/staticData";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  orderInfo: OrderType;
  setOrderInfo: (data: OrderType) => void;
  data: OrderType;
  trigger: any;
  isLoading: boolean;
}
const OrderTradeInfo = ({
  orderInfo,
  setOrderInfo,
  data,
  trigger,
  isLoading,
}: Props) => {
  const [showPaymentEditBtn, setShowPaymentEditBtn] = useState(false);
  const [showStatusEditBtn, setShowStatusEditBtn] = useState(false);
  const [showArrivalEditBtn, setShowArrivalEditBtn] = useState(false);

  const updateOrderInfo = async (keyname: string) => {
    try {
      const payload = {
        [keyname]: orderInfo[keyname as keyof OrderUpdateType],
      };
      const data = await trigger(payload);
      if (data) {
        toast.success("Successfully updated");
        setOrderInfo({
          ...orderInfo,
          [keyname]: orderInfo[keyname as keyof OrderUpdateType],
        });
        setShowPaymentEditBtn(false);
        setShowStatusEditBtn(false);
        setShowArrivalEditBtn(false);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex flex-col mx-2 md:w-[300px] my-2">
        <LabelTypography title="Payment Method" />
        <RadioGroupSelector
          dataArr={paymentMethods}
          infodata={orderInfo.paymentMethod}
          handleChange={(e) => {
            setShowPaymentEditBtn(true);
            setOrderInfo({ ...orderInfo, paymentMethod: e.target.value });
          }}
        />
        <DetailEditCancelButton
          show={showPaymentEditBtn}
          handleCancel={() => {
            setOrderInfo({ ...orderInfo, paymentMethod: data?.paymentMethod });
            setShowPaymentEditBtn(false);
          }}
          handleUpdate={() => {
            updateOrderInfo("paymentMethod");
          }}
          loading={isLoading}
        />
      </div>
      <div className="flex flex-col mx-2 md:w-[300px] my-2">
        <LabelTypography title="Order Status" />
        <RadioGroupSelector
          dataArr={orderStatus}
          infodata={orderInfo.orderStatus}
          handleChange={(e) => {
            setShowStatusEditBtn(true);
            setOrderInfo({ ...orderInfo, orderStatus: e.target.value });
          }}
        />
        <DetailEditCancelButton
          show={showStatusEditBtn}
          handleCancel={() => {
            setOrderInfo({ ...orderInfo, orderStatus: data?.orderStatus });
            setShowStatusEditBtn(false);
          }}
          handleUpdate={() => {
            updateOrderInfo("orderStatus");
          }}
          loading={isLoading}
        />
      </div>
      <div className="flex flex-col mx-2 md:w-[300px] my-2">
        <LabelTypography title="Has Already Arrived?" />
        <RadioGroupSelector
          dataArr={[
            { id: 1, label: "YES" },
            { id: 2, label: "NO" },
          ]}
          infodata={orderInfo.hasAlreadyArrived ? "YES" : "NO"}
          handleChange={(e) => {
            setShowArrivalEditBtn(true);
            setOrderInfo({
              ...orderInfo,
              hasAlreadyArrived: e.target.value === "YES" ? true : false,
            });
          }}
        />
        <DetailEditCancelButton
          show={showArrivalEditBtn}
          handleCancel={() => {
            setOrderInfo({
              ...orderInfo,
              hasAlreadyArrived: data?.hasAlreadyArrived,
            });
            setShowArrivalEditBtn(false);
          }}
          handleUpdate={() => {
            updateOrderInfo("hasAlreadyArrived");
          }}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default OrderTradeInfo;
