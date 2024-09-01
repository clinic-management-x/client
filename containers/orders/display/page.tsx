"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreateOrderDialog from "@/components/dialogs/orders/CreateOrderDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import { getOrders } from "@/datafetch/orders/orders.api";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import config from "@/utils/config";
import { orderEndPoint } from "@/utils/endpoints";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import OrdersTable from "./orderTable";
import SkeletonFrame from "./skeleton";

const OrderDisplay = () => {
  const dispatch = useDispatch();
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);

  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);

  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${orderEndPoint}?search=${search}`,
    getOrders
  );

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  });

  const hanldeSearchChange = (e: any) => {
    setTypeSearch(e.target.value);
    e.target.value === "" ? setSearch("") : "";
  };

  return (
    <div className="flex flex-col overflow-y-scroll">
      <Box sx={{ mb: 40 }}>
        <div
          className={` ${
            showMobileSearchBar ? "hidden" : ""
          }  h-[70px] md:h-[80px] mt-16 md:mt-0 w-full flex items-center justify-between md:justify-start `}
        >
          <div className={`w-[40%] pl-4`}>
            <CreateButton
              disabled={false}
              handleClick={() => {
                setOpen(true);
              }}
              showIcon={true}
            />
          </div>
          <div className="w-[60%] flex items-center justify-end mr-4  ">
            <IconButton
              className="md:hidden mr-2"
              onClick={() => {
                dispatch(insertShowMobileSearchBar(true));
              }}
            >
              <FiSearch size={28} className="text-primaryBlue-300" />
            </IconButton>

            <div className="hidden md:block ">
              <SearchBar
                selectedValue={typeSearch}
                handleClick={(value) => {
                  setSearch(value);
                }}
                handleChange={hanldeSearchChange}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-full mt-16 md:hidden md:mt-0 h-[70px] text-black ${
            showMobileSearchBar ? "flex items-center justify-center" : "hidden"
          }`}
        >
          <SearchBar
            selectedValue={typeSearch}
            handleClick={(value) => {
              setSearch(value);
            }}
            handleChange={hanldeSearchChange}
          />
          <IconButton
            onClick={() => {
              setSearch("");
              setTypeSearch("");
              dispatch(insertShowMobileSearchBar(false));
            }}
          >
            <RxCross1 className="text-primaryBlue-300" />
          </IconButton>
        </div>
        {isLoading ? <SkeletonFrame /> : <OrdersTable orders={orders} />}
      </Box>

      <CreateOrderDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        mutate={mutate}
      />
    </div>
  );
};

export default OrderDisplay;
