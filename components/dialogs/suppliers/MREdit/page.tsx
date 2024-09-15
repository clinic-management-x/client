import CloseButton from "@/components/buttons/CloseButton/page";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  getMedRepresentative,
  insertMedRepresentative,
} from "@/redux/slices/supplier";
import { Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactDisplay from "../ContactDispaly/page";
import ContactCreate from "../ContactCreate/page";
import AddButton from "@/components/buttons/AddButton/page";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { supplierEndPoint } from "@/utils/endpoints";
import { editMR } from "@/datafetch/supplier/supplier.api";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  handleClose: () => void;
  medRepresentatives: MedicalRepresentativeType[];
  setMedRepresentatives: (data: MedicalRepresentativeType[]) => void;
}

interface ContactType {
  name?: string;
  value: string;
}

const MREditDialog = ({
  open,
  handleClose,
  medRepresentatives,
  setMedRepresentatives,
}: Props) => {
  const dispatch = useDispatch();
  const mrData = useSelector(getMedRepresentative);
  const [mrInfo, setMrInfo] = useState<MedicalRepresentativeType | null>(null);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [contactData, setContactData] = useState("");
  const [showContactSelector, setShowContactSelector] = useState(false);

  const { trigger, isMutating: detailMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${supplierEndPoint}/mr/${mrInfo?._id}`,
    editMR
  );

  useEffect(() => {
    if (mrData) {
      setMrInfo({ ...mrData, mobile: mrData.mobile.substring(4) });
      setContacts(mrData.contacts || []);
    }
  }, [mrData]);

  const closeDialog = () => {
    handleClose();
    dispatch(insertMedRepresentative(null));
    setMrInfo(null);
    setContacts([]);
  };

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
      <div className="flex flex-col px-6 pb-6 dark:bg-[#3C3C3C]">
        <CloseButton handleClose={closeDialog} />
        <Typography
          variant="h6"
          className="font-semibold mb-2 mt-6 mx-2 text-whiteText dark:text-darkText"
        >
          Edit Medical Representative
        </Typography>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Name" />
          <CustomTextField
            value={mrInfo?.name || ""}
            handleChange={(e) => {
              mrInfo ? setMrInfo({ ...mrInfo, name: e.target.value }) : "";
            }}
          />
        </div>
        <div className="flex flex-col mx-2">
          <LabelTypography title="Mobile" />

          <CustomTextField
            value={mrInfo?.mobile as string}
            type="mobile"
            handleChange={(e) => {
              if (isNaN(e.target.value)) return;
              mrInfo ? setMrInfo({ ...mrInfo, mobile: e.target.value }) : "";
            }}
          />
        </div>
        <div className="flex flex-col mx-2 mb-2">
          <LabelTypography title="Email" />
          <CustomTextField
            value={mrInfo?.email || ""}
            handleChange={(e) => {
              mrInfo ? setMrInfo({ ...mrInfo, email: e.target.value }) : "";
            }}
          />
        </div>
        <div className="md:ml-[-12px]">
          <ContactDisplay
            contacts={contacts}
            setContacts={setContacts}
            mr={true}
            edit={true}
          />
          {showContactSelector ? (
            <ContactCreate
              contacts={contacts}
              setContacts={setContacts}
              contactData={contactData}
              setContactData={setContactData}
              setSelectedContact={setSelectedContact}
              selectedContact={selectedContact}
              setShowContactSelector={setShowContactSelector}
            />
          ) : (
            <></>
          )}
          <div className={`md:ml-4 mt-2`}>
            <AddButton
              handleClick={() => {
                if (contactData === "" && !selectedContact) {
                  setShowContactSelector(true);
                }
              }}
            />
          </div>
        </div>
        <PrimaryButton
          text="Update"
          loading={detailMutating}
          disabled={mrInfo?.name === "" || mrInfo?.mobile == ""}
          onClick={async () => {
            try {
              delete mrInfo?.__v;
              delete mrInfo?._id;
              delete mrInfo?.clinic;
              const response = await trigger({
                ...mrInfo,
                mobile: `+959` + mrInfo?.mobile,
                contacts: contacts,
              });
              if (response) {
                setMedRepresentatives(
                  medRepresentatives.map((mr) => {
                    return mr._id === response._id ? response : mr;
                  })
                );

                toast.success("Successfully updated.");
                closeDialog();
              }
            } catch (error) {
              toast.error("Something went wrong.");
            }
          }}
          className="mt-2 m-auto "
        />
      </div>
    </Dialog>
  );
};

export default MREditDialog;
