import CloseButton from "@/components/buttons/CloseButton/page";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  MobileStepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import createGroupImg from "@/public/telegram/creategroup.jpeg";
import groupImg from "@/public/telegram/group.jpeg";
import addBotImg from "@/public/telegram/addbot.jpeg";
import addAdminImg from "@/public/telegram/addadmin.jpeg";
import groupSettingImg from "@/public/telegram/groupsetting.jpeg";
import promotedImg from "@/public/telegram/promoted.jpeg";
import getIdImg from "@/public/telegram/getId.jpeg";
import Image from "next/image";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Guide = ({ open, handleClose }: Props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="paper"
      open={open}
      onClose={handleClose}
    >
      <DialogContent
        dividers={true}
        className="flex flex-col min-h-[640px] dark:bg-[#3C3C3C]"
      >
        <Box className="h-[500px]">
          <CloseButton handleClose={handleClose} />
          <div>
            <Typography
              variant="h6"
              className="text-whiteText dark:text-darkText font-bold"
            >
              Setup Guide
            </Typography>

            {activeStep == 0 ? (
              <div className="flex flex-col items-center justify-center">
                <Typography className="text-whiteText dark:text-darkText font-medium mb-6">
                  1. Create a telegram group with your supplier
                </Typography>
                <Image src={createGroupImg} alt="" height={600} width={300} />
              </div>
            ) : activeStep == 1 ? (
              <div className="flex flex-col items-center justify-center">
                <Typography className="text-whiteText dark:text-darkText font-medium mb-6">
                  2. Add bot to your group
                </Typography>
                <div className="flex items-center justify-center space-x-2">
                  <Image src={addBotImg} alt="" height={600} width={300} />
                  <Image src={groupImg} alt="" height={600} width={300} />
                </div>
              </div>
            ) : activeStep == 2 ? (
              <div className="flex flex-col items-center justify-center">
                <Typography className="text-whiteText dark:text-darkText font-medium mb-6">
                  3. Go to settings and choose Administrators
                </Typography>
                <Image src={groupSettingImg} alt="" height={600} width={300} />
              </div>
            ) : activeStep == 3 ? (
              <div className="flex flex-col items-center justify-center">
                <Typography className="text-whiteText dark:text-darkText font-medium mb-6">
                  4. Give our bot the administrator role
                </Typography>
                <div className="flex items-center justify-center space-x-2">
                  <Image src={addAdminImg} alt="" height={600} width={300} />
                  <Image src={promotedImg} alt="" height={600} width={300} />
                </div>
              </div>
            ) : activeStep == 4 ? (
              <div className="flex flex-col items-center justify-center">
                <Typography className="text-whiteText dark:text-darkText font-medium mb-6">
                  5. Get groupId by typing '/groupId'
                </Typography>
                <Image src={getIdImg} alt="" height={600} width={300} />
              </div>
            ) : (
              <></>
            )}
          </div>

          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1, mx: "auto", mt: 6 }}
            className="dark:bg-[#3C3C3C]"
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === 4}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Guide;
