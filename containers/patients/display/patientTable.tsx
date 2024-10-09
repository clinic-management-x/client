"use client";
import {
  Alert,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { FaViber } from "react-icons/fa";

interface Props {
  patients: PatientType[];
}
const PatientTable = ({ patients }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyId, setCopyId] = useState("");
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setCopyId("");
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <TableContainer className=" border-[0.5px] rounded" sx={{ ml: 2 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell />{" "} */}
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Patient Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Date Of Birth
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Gender
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Postal Code
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Preferred Way To Contact
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Emergency Contact
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {patients.length ? (
          patients?.map((patient, index) => {
            return (
              <>
                <TableRow
                  sx={{
                    "& > *": { borderBottom: "unset" },
                  }}
                  className={`${
                    index % 2 == 0
                      ? "bg-[#DEEFFF] dark:bg-[#292929]"
                      : "dark:bg-transparent bg-[#FFFFFF]"
                  } `}
                >
                  <TableCell className=" text-whiteText dark:text-darkText  flex items-center space-x-2">
                    <span>{patient.patientId}</span>
                    <div className="relative">
                      <div
                        className={`${
                          isCopied && copyId === patient.patientId
                            ? "absolute"
                            : "hidden"
                        }  p-1 -right-4 -top-8 rounded text-center text-white bg-success`}
                      >
                        Copied!
                      </div>
                      <Tooltip
                        title={isCopied ? "" : "Copy to clipboard"}
                        placement="top"
                        arrow
                      >
                        <button
                          onClick={() => {
                            setCopyId("" + patient.patientId);
                            handleCopy("" + patient.patientId);
                          }}
                          style={{}}
                          className="bg-primaryBlue-200 p-1 text-white rounded-md"
                        >
                          <IoCopyOutline />
                        </button>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    <Link
                      href={`/backoffice/patients/${patient._id}`}
                      className=" underline underline-offset-1"
                    >
                      {patient.name}
                    </Link>
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {dayjs(patient.dateOfBirth).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className=" text-whiteText dark:text-darkText"
                  >
                    {patient.gender}
                  </TableCell>
                  <TableCell
                    className=" text-whiteText dark:text-darkText"
                    sx={{ ml: 4 }}
                  >
                    {patient.postalCode}
                  </TableCell>
                  <TableCell
                    className=" text-whiteText dark:text-darkText "
                    align="center"
                  >
                    <div className="flex items-center justify-center space-x-2 ">
                      {patient.contacts.map((contact) => {
                        return contact.is_preferred_way ? (
                          contact.name === "email" ? (
                            <AiOutlineMail size={22} />
                          ) : contact.name === "mobile" ? (
                            <MdOutlinePermPhoneMsg size={22} />
                          ) : (
                            <FaViber size={22} className="text-[#663E8B]" />
                          )
                        ) : (
                          <></>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {patient.emergencyMobileContact}
                  </TableCell>
                </TableRow>
              </>
            );
          })
        ) : (
          <TableRow
            sx={{ "& > *": { borderBottom: "unset" } }}
            className={`${"bg-[#DEEFFF] dark:bg-[#292929]"}`}
          >
            <TableCell
              colSpan={7}
              align="center"
              className="text-whiteText dark:text-darkText"
            >
              No Patient Yet
            </TableCell>
          </TableRow>
        )}
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
