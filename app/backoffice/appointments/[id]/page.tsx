import EditAppointment from "@/containers/appointments/edit/page";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="overflow-scroll h-full">
      <EditAppointment id={params.id} />
    </main>
  );
};

export default Page;
