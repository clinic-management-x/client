import EditDoctorPage from "@/containers/doctors/edit/page";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="overflow-scroll h-full">
      <EditDoctorPage id={params.id} />
    </main>
  );
};

export default Page;
