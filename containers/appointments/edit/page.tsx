import BackButton from "@/components/buttons/BackButton/page";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const EditAppointment = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <section className="flex flex-col overflow-y-scroll ">
      <Box sx={{ mb: 50 }}>
        <BackButton
          handleClick={() => {
            router.push("/backoffice/appointments");
          }}
        />
      </Box>
      ;
    </section>
  );
};

export default EditAppointment;
