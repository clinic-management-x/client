import CloseButton from "@/components/buttons/CloseButton/page";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { getPageNumber } from "@/redux/slices/workers";
import { generateBarcodePdf } from "@/utils/pdf";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  closeDialog: () => void;
  imageUrls: { imageUrl: string; quantity: number }[];
}

const DownloadBarcodeDialog = ({ open, closeDialog, imageUrls }: Props) => {
  const pageNumber = useSelector(getPageNumber);
  const [checked, setChecked] = useState(false);
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(1);
  const [urlsToPrint, setUrlsToPrint] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setUrlsToPrint(imageUrls.map((imageurl) => imageurl.imageUrl));
    }
  }, [open]);

  return (
    <Dialog
      scroll="paper"
      open={open}
      onClose={() => {
        setChecked(false);
        setUrlsToPrint([]);
        closeDialog();
      }}
    >
      <DialogContent dividers={true} className=" dark:bg-[#3C3C3C]">
        <CloseButton
          handleClose={() => {
            setChecked(false);
            setUrlsToPrint([]);
            closeDialog();
          }}
        />
        <Box className="w-full px-6">
          <Typography variant="h6" className="dark:text-darkText">
            Enter Barcode Size
          </Typography>
          <LabelTypography title="Width(cm)" />
          <CustomTextField
            type="number"
            value={width}
            handleChange={(e) => {
              setWidth(e.target.value);
            }}
          />
          <LabelTypography title="Height(cm)" />
          <CustomTextField
            type="number"
            value={height}
            handleChange={(e) => {
              setHeight(e.target.value);
            }}
          />
          <FormGroup className="mt-2">
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      let newUrlsArr: string[] = [];

                      imageUrls.forEach((imageurl) => {
                        const tempArr = Array(imageurl.quantity).fill(
                          imageurl.imageUrl
                        ) as string[];
                        newUrlsArr = newUrlsArr.concat(tempArr);
                      });

                      setUrlsToPrint(newUrlsArr);
                    } else {
                      setUrlsToPrint(
                        imageUrls.map((imageurl) => imageurl.imageUrl)
                      );
                    }
                    setChecked(!checked);
                  }}
                />
              }
              label={
                <p className="text-[14px] dark:text-darkText">
                  Generate barcode images <br></br>
                  according to the quantity
                </p>
              }
            />
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions className="w-full  dark:bg-[#3C3C3C]">
        <div className="m-auto ">
          <PrimaryButton
            text="Download"
            loading={false}
            disabled={false}
            onClick={() => {
              generateBarcodePdf(
                urlsToPrint,
                width * 28.3465,
                height * 28.3465,
                pageNumber
              );
              closeDialog();
            }}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadBarcodeDialog;
