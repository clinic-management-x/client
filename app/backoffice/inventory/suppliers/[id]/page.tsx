import EditDoctorPage from "@/containers/doctors/edit/page";
import EditSupplier from "@/containers/suppliers/edit/page";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="overflow-scroll h-full">
      <EditSupplier id={params.id} />
    </main>
  );
};

export default Page;
