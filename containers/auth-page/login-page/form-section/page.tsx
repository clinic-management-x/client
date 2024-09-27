"use client";
import React, { useState } from "react";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import GoogleAuth from "../../oauth/page";
import MainForm, { UserInfo } from "../../main-form/page";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { authEndPoint } from "@/utils/endpoints";
import { signinUser } from "@/datafetch/auth/auth.api";
import { encryptData } from "@/utils/encrypt";
import { insertClinicId } from "@/redux/slices/user";
import { useDispatch } from "react-redux";

const LoginSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    password: "",
  });
  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${authEndPoint}/login`,
    signinUser
  );

  const handleSignIn = async () => {
    try {
      const response: any = await trigger(userInfo);

      if (response) {
        console.log("response", response);
        const ac = encryptData(response.accessToken);
        const rf = encryptData(response.refreshToken);

        localStorage.setItem("access-x", ac);
        localStorage.setItem("refresh-x", rf);
        dispatch(insertClinicId(response.clinicId));
        router.push("/backoffice");
      } else {
        toast.error("Email or password incorrect.");
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message;
      errorMsg ? toast.error(errorMsg) : toast.error("Something went wrong.");
    }
  };

  return (
    <div className="w-full lg:w-[50%] m-auto text-whiteText  rounded-lg flex flex-col items-center dark:text-darkText h-screen">
      <ThemeSwitcherButton isAuth={true} />

      <Typography variant="h4" className="font-bold mt-8">
        Sign in
      </Typography>
      <Typography variant="body1" className="mt-4">
        Welcome to Techocare. Explore the best service.
      </Typography>
      <MainForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        signIn={true}
      />
      <Button
        className="w-[300px] mt-8 h-[50px]"
        variant="contained"
        onClick={handleSignIn}
      >
        {isMutating ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          "Sign In"
        )}
      </Button>

      <Divider sx={{ width: "80%", my: 6 }} className="">
        {" "}
        <Typography variant="body1" className="font-bold">
          Or
        </Typography>
      </Divider>
      <GoogleAuth />
      <div className="flex items-center mt-4 space-x-2">
        <Typography>Don't have an account?</Typography>
        <Link href={"/signup"}>
          <Typography className="underline text-blue-700">Sign up</Typography>
        </Link>
      </div>
    </div>
  );
};

export default LoginSection;
