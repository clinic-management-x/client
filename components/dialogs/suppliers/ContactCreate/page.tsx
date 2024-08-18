"use client";
import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import { Box } from "@mui/material";
import React from "react";
import { FaTelegram, FaViber } from "react-icons/fa";
import { LiaSmsSolid } from "react-icons/lia";
export const contactDataArr = [
  {
    _id: 1,
    name: "SMS",
    icon: <LiaSmsSolid size={24} className="text-[#3090DD]" />,
  },
  {
    _id: 2,
    name: "Viber",
    icon: <FaViber size={22} className="text-[#663E8B]" />,
  },
  {
    _id: 3,
    name: "Telegram",
    icon: <FaTelegram size={22} className="text-[#3AABE1]" />,
  },
];

interface Props {
  contacts: { name?: string; value: string }[];
  setContacts: (data: { name?: string; value: string }[]) => void;
  setShowContactSelector: (data: boolean) => void;
  contactData: any;
  setContactData: (data: any) => void;
  setSelectedContact: (data: number | null) => void;
  selectedContact: number | null;
  setShowContactEditBox?: (data: boolean) => void;
}
const ContactCreate = ({
  contacts,
  setContacts,
  setShowContactSelector,
  contactData,
  selectedContact,
  setContactData,
  setSelectedContact,
  setShowContactEditBox,
}: Props) => {
  const alreadySelectedContacts = contacts.map((data) => data.name);
  return (
    <Box
      className={` mt-2 mx-2  md:ml-2 lg:ml-6 flex flex-col md:flex-row items-center justify-start space-y-2 md:space-y-0  md:space-x-2`}
    >
      <div className=" w-full mb-2 md:mb-0 md:w-[200px]">
        <PlainSelector
          dataArr={contactDataArr.filter(
            (dataarr) => !alreadySelectedContacts.includes(dataarr.name)
          )}
          title="Contacts"
          selectedValue={selectedContact}
          handleChange={(e, value) => {
            setSelectedContact(Number(e.target.value));
          }}
        />
      </div>
      <div className="w-full  md:w-[200px] ">
        <CustomTextField
          value={contactData}
          handleChange={(e) => {
            setContactData(e.target.value);
          }}
          className="w-full "
          placeholder="Enter contact number"
        />
      </div>

      <CrossCheckButtonsGroup
        handleCancel={() => {
          setSelectedContact(null);
          setContactData("");
          setShowContactSelector(false);
        }}
        handleAdd={() => {
          const chosenContact = contactDataArr.find(
            (data) => data._id == selectedContact
          );
          setContacts([
            ...contacts,
            { name: chosenContact?.name, value: contactData },
          ]);
          setSelectedContact(null);
          setContactData("");
          setShowContactSelector(false);
          setShowContactEditBox && setShowContactEditBox(true);
        }}
      />
    </Box>
  );
};

export default ContactCreate;
