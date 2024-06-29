import DisplayDoctors from "@/containers/doctors/display/page";
import React from "react";
import { useSWRConfig } from "swr";

const Page = () => {
  return (
    <main className="overflow-scroll h-full">
      <DisplayDoctors />
    </main>
  );
};

export default Page;
