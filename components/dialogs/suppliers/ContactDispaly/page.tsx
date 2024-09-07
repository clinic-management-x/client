import LabelTypography from "@/components/typography/LabelTypography/page";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TrashButton from "@/components/buttons/TrashButton/page";
import { contactDataArr } from "../ContactCreate/page";
import EditButton from "@/components/buttons/EditButton/page";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import DeleteDialog from "../../delete";

interface Props {
  contacts: { name?: string; value: string }[];
  setContacts: (data: { name?: string; value: string }[]) => void;
  mr?: boolean;
  edit?: boolean;
  trigger?: any;
}

const ContactDisplay = ({
  contacts,
  setContacts,
  mr,
  edit,
  trigger,
}: Props) => {
  const [contactToEdit, setContactToEdit] = useState<{
    name?: string;
    value: string;
  } | null>(null);
  const [contactToDelete, setContactToDelete] = useState<{
    name?: string;
    value: string;
  } | null>(null);
  const [editName, setEditName] = useState("");
  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <Box className=" mt-2 md:mt-0 mx-2 md:ml-2 lg:ml-6 flex flex-col">
      <LabelTypography title="Contacts" />
      {contacts?.map((contact, index) => {
        const currentContact = contactDataArr.find(
          (ctData) => ctData.name == contact.name
        );
        return (
          <div className="" key={index}>
            <div className="flex items-center mb-2 ">
              <div className="flex items-center px-2 w-[260px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2">
                {currentContact?.icon}
                {contactToEdit && editName === contact.name ? (
                  <TextField
                    value={contactToEdit?.value}
                    onChange={(e) => {
                      setContactToEdit({
                        ...contactToEdit,
                        value: e.target.value,
                      });
                    }}
                    variant="standard"
                  />
                ) : (
                  <Typography
                    variant="body1"
                    className="dark:text-darkText text-whiteText"
                  >
                    {contact.value}
                  </Typography>
                )}
              </div>{" "}
              {contactToEdit && contactToEdit.name === contact.name ? (
                <div className="flex items-center ml-2 space-x-1">
                  <IconButton
                    onClick={() => {
                      setContactToEdit(null);
                      setContacts(contacts);
                    }}
                  >
                    <RxCross2 />
                  </IconButton>

                  <IconButton>
                    <MdCheck
                      className="text-green-500"
                      onClick={async () => {
                        const contactsArr = contacts.map((contactdata) => {
                          return contactdata.name === contact.name
                            ? contactToEdit
                            : contactdata;
                        });
                        if (mr) {
                          setContacts(contactsArr);
                          setContactToEdit(null);
                        } else {
                          try {
                            const response = await trigger({
                              contacts: contactsArr,
                            });

                            if (response) {
                              //mutate();
                              toast.success("Successfully added.");
                              setContactToEdit(null);
                              setContacts(response?.contacts);
                            }
                          } catch (error) {
                            toast.error("Something went wrong.");
                          }
                        }
                      }}
                    />
                  </IconButton>
                </div>
              ) : (
                <div className="flex items-center ml-2 space-x-1">
                  {edit ? (
                    <EditButton
                      handleClick={() => {
                        setEditName(contact.name as string);
                        setContactToEdit(contact);
                      }}
                    />
                  ) : (
                    <></>
                  )}

                  <TrashButton
                    handleClick={() => {
                      setOpenDeleteBox(true);
                      setContactToDelete(contact);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
      <DeleteDialog
        open={openDeleteBox}
        handleClose={() => {
          setOpenDeleteBox(false);
          setContactToDelete(null);
        }}
        text={"this contact"}
        handleDelete={async () => {
          setDeleteLoading(true);
          const contactsArr = contacts.filter(
            (contact) => contact.name !== contactToDelete?.name
          );

          try {
            const response = await trigger({
              contacts: contactsArr,
            });

            if (response) {
              setOpenDeleteBox(false);
              setDeleteLoading(false);
              toast.success("Successfully deleted.");
              setContactToEdit(null);
              setContacts(response?.contacts);
            }
          } catch (error) {
            setDeleteLoading(false);
            toast.error("Something went wrong.");
          }
        }}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default ContactDisplay;
