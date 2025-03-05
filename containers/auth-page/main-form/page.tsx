import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";

export interface UserInfo {
  username?: string;
  email?: string;
  password: string;
}

interface Props {
  userInfo: UserInfo;
  setUserInfo: (data: UserInfo) => void;
  errors?: any;
  showPassword: boolean;
  setShowPassword: (data: boolean) => void;
  signIn: Boolean;
}
const MainForm = ({
  userInfo,
  setUserInfo,
  errors,
  showPassword,
  setShowPassword,
  signIn,
}: Props) => {
  const { theme } = useTheme();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box className="flex flex-col space-y-2 mt-8">
      <Typography variant="body1" className="">
        Email
      </Typography>
      <TextField
        className="w-[300px]"
        value={userInfo.email}
        onChange={(e) => {
          signIn
            ? setUserInfo({ ...userInfo, username: e.target.value })
            : setUserInfo({ ...userInfo, email: e.target.value });
        }}
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
              backgroundColor: "transparent",
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
      <p className="text-error text-[12px]">{errors?.email?._errors[0]}</p>
      <Typography variant="body1" className="">
        Password
      </Typography>
      <FormControl className="w-[300px]" variant="filled">
        <OutlinedInput
          sx={{
            color: theme === "dark" ? "white" : "dark",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9CA3AF",
              backgroundColor: "#C7C7C7F",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9CA3AF",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9CA3AF",
            },
          }}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={userInfo.password}
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
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
      <p className="text-error text-[12px]">{errors?.password?._errors[0]}</p>
    </Box>
  );
};

export default MainForm;
