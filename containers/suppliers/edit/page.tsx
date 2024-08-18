"use client";

import BackButton from "@/components/buttons/BackButton/page";
import DeleteMajorInfo from "@/components/dialogs/delete/DeleteMajorInfo";
import { deleteSupplier, getSupplier } from "@/datafetch/supplier/supplier.api";
import config from "@/utils/config";
import { supplierEndPoint } from "@/utils/endpoints";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import SupplierMain from "./SupplierMain";
import MRMain from "./MRMain";
import SkeletonPage from "./skeleton";

const EditSupplier = ({ id }: { id: string }) => {
  const router = useRouter();

  //delete supplier
  const [openDeleteSupplierDialog, setOpenDeleteSupplierDialog] =
    useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  //swr
  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${supplierEndPoint}/${id}`,
    getSupplier
  );

  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box sx={{ mb: 50 }}>
        <BackButton
          handleClick={() => {
            router.push("/backoffice/inventory/suppliers");
          }}
        />
        {isLoading ? (
          <SkeletonPage />
        ) : (
          <>
            <SupplierMain id={id} data={data} mutate={mutate} />

            <div className="lg:ml-12 mt-6">
              <MRMain id={id} data={data} />
            </div>

            <Typography
              className="text-slate-500 dark:text-darkText underline ml-2 lg:ml-20 mt-10"
              onClick={() => {
                setOpenDeleteSupplierDialog(true);
              }}
            >
              Delete Supplier?
            </Typography>

            <DeleteMajorInfo
              open={openDeleteSupplierDialog}
              handleClose={() => {
                setOpenDeleteSupplierDialog(false);
              }}
              handleDelete={async () => {
                try {
                  setDeleteLoading(true);
                  const data = await deleteSupplier(
                    `${config.apiBaseUrl}/${supplierEndPoint}/${id}`
                  );
                  if (data) {
                    setDeleteLoading(false);
                    toast.success("Successfully deleted.");
                    setOpenDeleteSupplierDialog(false);
                    router.push("/backoffice/inventory/suppliers");
                  }
                } catch (error) {
                  setDeleteLoading(false);
                  toast.error("Something went wrong.");
                }
              }}
              loading={deleteLoading}
              text1="Supplier"
              text2="Deleting the supplier will remove all of the supplier's information from
          our databse.This cannot be undone."
            />
          </>
        )}
      </Box>
    </section>
  );
};

export default EditSupplier;
