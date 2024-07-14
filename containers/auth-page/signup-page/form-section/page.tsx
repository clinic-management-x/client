"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";

const SignUpSection = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="w-full lg:w-[50%] m-auto text-whiteText  rounded-lg flex flex-col items-center dark:text-darkText h-screen">
      <div className="mt-2">
        <ThemeSwitcherButton />
      </div>
      <Typography variant="h4" className="font-bold mt-8">
        Sign up
      </Typography>
      <Typography variant="body1" className="mt-4">
        Welcome to Techocare. Explore the best service.
      </Typography>
      <Box className="flex flex-col space-y-2 mt-8">
        <Typography variant="body1" className="">
          Email
        </Typography>
        <TextField
          className="w-[300px]"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineMailOutline className="dark:text-white" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#9CA3AF",
                backgroundColor: "#C7C7C7F",
              },
              "&:hover fieldset": {
                borderColor: "#9CA3AF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#9CA3AF",
              },
            },
          }}
        />
        <Typography variant="body1" className="">
          Password
        </Typography>
        <FormControl
          className="w-[300px]"
          variant="outlined"
          sx={{
            ":root": {
              "& $notchedOutline": {
                borderColor: "red",
              },
              "&:hover $notchedOutline": {
                borderColor: "blue",
              },
              "&$focused $notchedOutline": {
                borderColor: "green",
              },
            },
          }}
        >
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  className="dark:text-white "
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Button className="w-[300px] mt-8 h-[50px]" variant="contained">
        Sign up
      </Button>

      <Divider sx={{ width: "80%", my: 6 }} className="">
        {" "}
        <Typography variant="body1" className="font-bold">
          Or
        </Typography>
      </Divider>
      <Box className="flex items-center justify-center space-x-2  w-[300px] border-[1px]  border-[#9CA3AF] h-[60px] rounded ">
        <FcGoogle size={28} />
        <Typography variant="body1" className="font-semibold">
          Sign in with google
        </Typography>
      </Box>
    </div>
  );
};

export default SignUpSection;
