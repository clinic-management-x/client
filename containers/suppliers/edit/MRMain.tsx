import AddButton from "@/components/buttons/AddButton/page";
import MRCreateDialog from "@/components/dialogs/suppliers/MRCreate/edit";
import MRDisplay from "@/components/dialogs/suppliers/MRDisplay/page";
import MREditDialog from "@/components/dialogs/suppliers/MREdit/page";
import { defaultMRInfo } from "@/utils/staticData";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  data: SupplierType;
}

const MRMain = ({ id, data }: Props) => {
  const [showMRs, setShowMRs] = useState(false);
  const [medRepresentative, setMedRepresentative] =
    useState<MedicalRepresentativeType | null>(defaultMRInfo);
  const [medicalRepresentatives, setMedicalRepresentatives] = useState<
    MedicalRepresentativeType[]
  >([]);
  const [showMREdit, setShowMREdit] = useState(false);

  useEffect(() => {
    if (data) {
      setMedicalRepresentatives(data.medRepresentatives || []);
    }
  }, [data]);

  return (
    <>
      <MRDisplay
        medRepresentatives={medicalRepresentatives}
        setMedRepresentatives={setMedicalRepresentatives}
        setShowMREdit={setShowMREdit}
        edit={true}
        id={id}
      />
      {showMRs ? (
        <MRCreateDialog
          medRepresentatives={medicalRepresentatives}
          setMedRepresentatives={setMedicalRepresentatives}
          medRepresentative={medRepresentative as MedicalRepresentativeType}
          setMedRepresentative={setMedRepresentative}
          setShowMR={setShowMRs}
          showMRs={showMRs}
          edit={true}
          id={id}
        />
      ) : (
        <></>
      )}
      <div className={`md:ml-4 mt-2 `}>
        <AddButton
          handleClick={() => {
            if (
              medRepresentative?.name === "" &&
              medRepresentative?.mobile === ""
            ) {
              setShowMRs(true);
            }
          }}
        />
      </div>
      <MREditDialog
        open={showMREdit}
        handleClose={() => {
          setShowMREdit(false);
        }}
        medRepresentatives={medicalRepresentatives}
        setMedRepresentatives={setMedicalRepresentatives}
      />
    </>
  );
};

export default MRMain;
