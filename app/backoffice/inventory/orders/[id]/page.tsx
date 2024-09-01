import EditOrder from "@/containers/orders/edit/page";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="overflow-scroll h-full">
      <EditOrder id={params.id} />
    </main>
  );
};

export default Page;
