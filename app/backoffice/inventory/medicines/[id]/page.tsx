import EditMedicine from "@/containers/medicines/edit/page";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="overflow-scroll h-full">
      <EditMedicine id={params.id} />
    </main>
  );
};

export default Page;
