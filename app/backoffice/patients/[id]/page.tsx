import EditPatientPage from "@/containers/patients/edit/page";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="overflow-scroll h-full">
      <EditPatientPage id={params.id} />
    </main>
  );
};

export default Page;
