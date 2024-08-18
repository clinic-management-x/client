import LabelTypography from "@/components/typography/LabelTypography/page";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TrashButton from "@/components/buttons/TrashButton/page";
import { contactDataArr } from "../ContactCreate/page";
import EditButton from "@/components/buttons/EditButton/page";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

interface Props {
  contacts: { name?: string; value: string }[];
  setContacts: (data: { name?: string; value: string }[]) => void;
  edit?: boolean;
  setShowContactEditBox?: (data: boolean) => void;
}

const ContactDisplay = ({
  contacts,
  setContacts,
  edit,
  setShowContactEditBox,
}: Props) => {
  const [contactToEdit, setContactToEdit] = useState<{
    name?: string;
    value: string;
  } | null>(null);
  const [editName, setEditName] = useState("");

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
                      onClick={() => {
                        setContactToEdit(null);
                        setContacts(
                          contacts.map((contactdata) => {
                            return contactdata.name === contact.name
                              ? contactToEdit
                              : contactdata;
                          })
                        );
                        setShowContactEditBox && setShowContactEditBox(true);
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
                      setContacts(
                        contacts.filter(
                          (contacti) => contacti.name !== contact.name
                        )
                      );
                      setShowContactEditBox && setShowContactEditBox(true);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export default ContactDisplay;
