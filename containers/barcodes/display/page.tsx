"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreateBarcodeDialog from "@/components/dialogs/barcodes/CreateBarcodeDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import { getBarcodes } from "@/datafetch/medicines/medicines.api";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber, insertPageNumber } from "@/redux/slices/workers";
import config from "@/utils/config";
import { barcodeEndPoint, medicineEndPoint } from "@/utils/endpoints";
import { Box, Button, IconButton, Pagination } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import SkeletonFrame from "./skeletonFrame";
import BarcodeTable from "./barcodeTable";
import { IoMdDownload } from "react-icons/io";
import DownloadBarcodeDialog from "@/components/dialogs/barcodes/DownloadBarcodeDialog/page";
import toast from "react-hot-toast";

const BarcodesDisplay = () => {
  const page = useSelector(getPageNumber);
  const theme = useTheme();
  const dispatch = useDispatch();
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const [imageUrls, setImageUrls] = useState<
    { imageUrl: string; quantity: number }[]
  >([]);
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [barcodes, setBarcodes] = useState<BarcodeDisplay[]>([]);
  const [openBarcodeDialog, setOpenBarcodeDialog] = useState(false);
  const { data, mutate, isLoading } = useSWR(
    `${
      config.apiBaseUrl
    }/${medicineEndPoint}/${barcodeEndPoint}?limit=${8}&skip=${skip}&search=${search}`,
    getBarcodes
  );

  useEffect(() => {
    if (data) {
      setBarcodes(data.data);
      setImageUrls(
        data.data.map((innerdata: BarcodeDisplay) => {
          return {
            imageUrl: innerdata.barCodeUrl,
            quantity: innerdata.quantity,
          };
        })
      );
    }
  }, [data]);

  const hanldeSearchChange = (e: any) => {
    setTypeSearch(e.target.value);
    e.target.value === "" ? setSearch("") : "";
  };
  return (
    <section className="flex flex-col overflow-y-scroll">
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
            <div>
              <Button
                onClick={() => {
                  if (barcodes.length === 0) {
                    return toast.error("No barcode to download.");
                  }
                  setOpenBarcodeDialog(true);
                }}
                className=" bg-primaryBlue-400 mr-2 hover:bg-primaryBlue-400 flex items-center text-white "
              >
                <IoMdDownload className="md:mr-2 text-[20px]" />{" "}
                <p className="hidden md:block">Download</p>
              </Button>
            </div>
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
        {isLoading ? <SkeletonFrame /> : <BarcodeTable barcodes={barcodes} />}
        <div className="mt-8 w-full m-auto flex items-center justify-center ">
          <Pagination
            size="large"
            count={Math.ceil(data?.count / 8)}
            defaultPage={page}
            color="primary"
            sx={{
              mx: 4,
              color: "gray",
              ul: {
                "& .MuiPaginationItem-root": {
                  color: theme.theme === "dark" ? "#fff" : "dark",
                },
              },
            }}
            className="space-x-2 dark:text-darkText"
            onChange={(e, pagenumber) => {
              dispatch(insertPageNumber(pagenumber));
              setSkip((pagenumber - 1) * 8);
            }}
          />
        </div>
      </Box>
      <CreateBarcodeDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        mutate={mutate}
      />
      <DownloadBarcodeDialog
        open={openBarcodeDialog}
        closeDialog={() => {
          setOpenBarcodeDialog(false);
        }}
        imageUrls={imageUrls}
      />
    </section>
  );
};

export default BarcodesDisplay;
