"use client";
import LoginSection from "@/containers/auth-page/login-page/form-section/page";
import React from "react";
import bgImage from "@/public/bg.avif";

const Page = () => {
  return (
    <main
      className="w-full h-full flex  bg-auth"
      // style={{ backgroundImage: "url('/bg.avif')" }}
    >
      <LoginSection />
    </main>
  );
};

export default Page;
