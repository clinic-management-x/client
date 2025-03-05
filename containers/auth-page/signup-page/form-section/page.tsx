"use client";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";
import { z } from "zod";
import toast from "react-hot-toast";
import config from "@/utils/config";
import useSWRMutation from "swr/mutation";
import { authEndPoint } from "@/utils/endpoints";
import { createUser } from "@/datafetch/auth/auth.api";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import GoogleAuth from "../../oauth/page";
import MainForm, { UserInfo } from "../../main-form/page";

const SignUpSection = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>(null);

  useEffect(() => {
    const formData = z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(8, { message: "Must be at least 8 words" }),
    });

    const result = formData.safeParse(userInfo);

    if (!result.success) {
      setErrors(result.error.format());
    } else {
      setErrors(null);
    }
  }, [userInfo]);

  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${authEndPoint}/register`,
    createUser
  );

  const handleSignUp = async () => {
    try {
      const response = await trigger({
        email: userInfo.email as string,
        password: userInfo.password,
      });

      if (response) {
        toast.success("Account creation is successful.");
        router.push("/login");
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message;
      errorMsg ? toast.error(errorMsg) : toast.error("Something went wrong.");
    }
  };

  return (
    <div className="w-full lg:w-[50%] m-auto text-whiteText  rounded-lg flex flex-col items-center dark:text-darkText h-screen">
      {/* <div className="mt-2">
        <ThemeSwitcherButton isAuth={true} />
      </div> */}
      <Typography variant="h4" className="font-bold mt-28">
        Sign up
      </Typography>
      <Typography variant="body1" className="mt-4">
        Welcome to Techocare. Explore the best service.
      </Typography>
      <MainForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        errors={errors}
        signIn={false}
      />
      <Button
        className="w-[300px] mt-8 h-[50px]"
        variant="contained"
        onClick={handleSignUp}
      >
        {isMutating ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          "Sign Up"
        )}
      </Button>

      {/* <Divider sx={{ width: "80%", my: 6 }} className="">
        {" "}
        <Typography variant="body1" className="font-bold">
          Or
        </Typography>
      </Divider>
      <GoogleAuth /> */}
      <div className="flex items-center mt-4 space-x-2">
        <Typography>Already have an account?</Typography>
        <Link href={"/login"}>
          <Typography className="underline text-blue-700">Sign in</Typography>
        </Link>
      </div>
    </div>
  );
};

export default SignUpSection;
