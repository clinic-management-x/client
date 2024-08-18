import TrashButton from "@/components/buttons/TrashButton/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { contactDataArr } from "../ContactCreate/page";
import EditButton from "@/components/buttons/EditButton/page";
import DeleteDialog from "../../delete";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { supplierEndPoint } from "@/utils/endpoints";
import { deleteMR } from "@/datafetch/supplier/supplier.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { insertMedRepresentative } from "@/redux/slices/supplier";

interface Props {
  medRepresentatives: MedicalRepresentativeType[];
  setMedRepresentatives: (data: MedicalRepresentativeType[]) => void;
  edit?: boolean;
  id?: string;
  setShowMREdit?: (data: boolean) => void;
}

const MRDisplay = ({
  medRepresentatives,
  setMedRepresentatives,
  edit,
  setShowMREdit,
  id,
}: Props) => {
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [name, setName] = useState("");
  const [mrId, setMrId] = useState("");
  const { trigger, isMutating: deleteMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${supplierEndPoint}/mr/${mrId}?supplier_id=${id}`,
    deleteMR
  );

  return (
    <Box className=" mt-2 md:mt-0 mx-2 md:ml-2 lg:ml-6 flex flex-col">
      <LabelTypography title="Medical Representatives" />
      {medRepresentatives.map((mrdata) => {
        return (
          <div className="flex items-center ">
            <div className="w-[80%] border-[1px] rounded border-[#9CA3AF] p-4 mb-2 ">
              <div className=" flex flex-col md:flex-row items-start  md:items-center justify-between ">
                <Typography
                  variant="body1"
                  className="font-bold text-gray-500 dark:text-gray-400"
                >
                  {mrdata.name}
                </Typography>
                <Typography
                  variant="body1"
                  className="font-bold text-gray-500 dark:text-gray-400"
                >
                  {mrdata.mobile}
                </Typography>
                <Typography
                  variant="body1"
                  className="font-bold text-gray-500 dark:text-gray-400"
                >
                  {mrdata.email}
                </Typography>
              </div>
              <div>
                {mrdata.contacts?.length ? (
                  mrdata.contacts?.map((mrcontact, index) => {
                    const currentContact = contactDataArr.find(
                      (contactdata) => contactdata.name === mrcontact.name
                    );
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-2 my-2"
                      >
                        <div>{currentContact?.icon}</div>
                        <Typography
                          variant="subtitle2"
                          className="dark:text-darkText text-whiteText"
                        >
                          {mrcontact.value}
                        </Typography>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex items-center ml-2 space-x-1">
              {edit ? (
                <EditButton
                  handleClick={() => {
                    dispatch(insertMedRepresentative(mrdata));
                    setShowMREdit && setShowMREdit(true);
                  }}
                />
              ) : (
                <></>
              )}

              <TrashButton
                handleClick={() => {
                  if (edit) {
                    setOpenDeleteDialog(true);
                    setName(mrdata.name);
                    mrdata?._id ? setMrId(mrdata._id) : "";
                  } else {
                    setMedRepresentatives(
                      medRepresentatives.filter(
                        (data) => data._id !== mrdata._id
                      )
                    );
                  }
                }}
              />
            </div>
          </div>
        );
      })}
      {openDeleteDialog ? (
        <DeleteDialog
          text={`this medical representative (${name})`}
          open={openDeleteDialog}
          handleClose={() => {
            setOpenDeleteDialog(false);
          }}
          handleDelete={async () => {
            try {
              const response = await trigger();
              if (response) {
                toast.success("Successfully deleted.");
                setMedRepresentatives(response.medRepresentatives);
                setOpenDeleteDialog(false);
              } else {
                toast.error("Something went wrong.");
              }
            } catch (error) {
              toast.error("Something went wrong.");
            }
          }}
          loading={deleteMutating}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default MRDisplay;
