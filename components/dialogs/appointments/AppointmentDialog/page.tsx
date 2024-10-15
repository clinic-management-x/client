import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import {
  createAppointment,
  updateAppointment,
} from "@/datafetch/appointments/appointment.api";
import { getDoctors, getSpecialities } from "@/datafetch/doctors/doctors.api";
import { getPatients } from "@/datafetch/patients/patients.api";
import config from "@/utils/config";
import {
  appointmentEndPoint,
  doctorEndPoint,
  patientsEndPoint,
} from "@/utils/endpoints";
import { defaultAppointmentData } from "@/utils/staticData";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import AutocompleteSearch from "@/components/input/AutoComplete/page";
import TestAutocomplete from "@/components/input/TestAutocomplete/page";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: any;
  appointment: CrudAppointmentType;
  setAppointment: (data: CrudAppointmentType) => void;
  edit: string;
}

const necessityArr = [
  { _id: "1", name: "Consultation" },
  { _id: "2", name: "Check-Up" },
  { _id: "3", name: "Disease" },
];

const AppointmentDialog = ({
  open,
  handleClose,
  mutate,
  appointment,
  setAppointment,
  edit,
}: Props) => {
  //To display patients
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [patientSearch, setPatientSearch] = useState("");

  const { data: patientsData, mutate: patientMutate } = useSWR(
    `${
      config.apiBaseUrl
    }/${patientsEndPoint}?limit=${8}&skip=${0}&search=${patientSearch}`,
    getPatients
  );

  useEffect(() => {
    if (patientsData) {
      setPatients(patientsData.data);
    }
  }, [patientsData]);

  // To display doctors
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [specialityId, setSpecialityId] = useState("");

  const searchQuery = specialityId
    ? `${
        config.apiBaseUrl
      }/${doctorEndPoint}?limit=${8}&skip=${0}&search=${doctorSearch}&speciality=${specialityId}`
    : `${
        config.apiBaseUrl
      }/${doctorEndPoint}?limit=${8}&skip=${0}&search=${doctorSearch}`;

  const { data, mutate: doctorMutate } = useSWR(searchQuery, getDoctors);

  useEffect(() => {
    setDoctors(data);
  }, [data]);

  const closeDialog = () => {
    handleClose();
  };

  // To handle data

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${appointmentEndPoint}`,
    createAppointment
  );
  const { trigger: updateTrigger, isMutating: updateMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${appointmentEndPoint}/`,
    updateAppointment
  );

  const handleCreate = async () => {
    try {
      const data =
        edit !== ""
          ? await updateTrigger(appointment)
          : await trigger(appointment);
      if (data) {
        mutate();
        toast.success("Successfully created.");
        setAppointment(defaultAppointmentData);
        handleClose();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.");
    }
  };

  console.log("appointment", appointment);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      scroll="paper"
      open={open}
      onClose={closeDialog}
    >
      <DialogTitle align="center" className="dark:bg-[#3C3C3C] w-full">
        <Typography
          variant="body1"
          className="text-whiteText dark:text-darkText font-bold"
        >
          {edit ? "Update Appointment" : "Create Appointment"}
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers={true}
        className="flex flex-col dark:bg-[#3C3C3C] p-4"
      >
        <Box className="flex flex-col md:flex-row md:space-x-4">
          <CloseButton handleClose={closeDialog} />
          <Box className="flex-grow mt-4 md:mt-0">
            <div className="flex flex-col p-1 space-y-2">
              <LabelTypography title="Patient" />
              <div className="md:w-[300px]">
                <TestAutocomplete
                  dataArr={patients}
                  dataIndex={"name"}
                  handleChange={async (e: any, newValue: any) => {
                    setAppointment({ ...appointment, patient: newValue._id });
                  }}
                  handleSearch={(e) => {
                    if (e.target.value.length > 3) {
                      patientMutate();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col p-1 space-y-2 mb-4">
              <LabelTypography title="Doctor" />
              <div className="md:w-[300px]">
                <TestAutocomplete
                  dataArr={doctors}
                  dataIndex={"name"}
                  handleChange={async (e: any, newValue: any) => {
                    console.log("new", newValue);
                    setAppointment({ ...appointment, doctor: newValue._id });
                  }}
                  handleSearch={(e) => {
                    if (e.target.value.length > 3) {
                      doctorMutate();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col p-1">
              <LabelTypography title="Appointment Time" />
              <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    className="border border-[#C4C4C4] dark:border-darkText rounded mb-4 md:mb-0 w-full md:w-[300px] h-[300px] md:h-auto"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);

                      setAppointment({
                        ...appointment,
                        appointmentDate: dayjs(newValue).toISOString(),
                        appointmentStartTime: startTime
                          ?.set("date", newValue.get("date"))
                          .toISOString(),
                        appointmentEndTime: endTime
                          ?.set("date", newValue.get("date"))
                          .toISOString(),
                      });
                    }}
                  />
                </LocalizationProvider>

                <div className="flex flex-col w-full md:w-1/2 space-y-4">
                  <LabelTypography title="From" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      value={startTime}
                      onChange={(newValue) => {
                        setStartTime(newValue);

                        setAppointment({
                          ...appointment,
                          appointmentStartTime: newValue
                            ?.set(
                              "date",
                              date?.get("date") || dayjs().get("date")
                            )
                            ?.toISOString(),
                        });
                      }}
                      className="border border-whiteText dark:border-darkText rounded"
                    />
                  </LocalizationProvider>

                  <LabelTypography title="To" />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      value={endTime}
                      onChange={(newValue) => {
                        setEndTime(newValue);
                        setAppointment({
                          ...appointment,
                          appointmentEndTime: newValue
                            ?.set(
                              "date",
                              date?.get("date") || dayjs().get("date")
                            )
                            ?.toISOString(),
                        });
                      }}
                      className="border border-whiteText dark:border-darkText rounded"
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-1 ">
              <LabelTypography title="Necessity" />
              <div className="md:w-[300px] mt-2">
                <PlainSelector
                  dataArr={necessityArr}
                  title={""}
                  handleChange={(e, value) => {
                    const selectedValue = necessityArr.find(
                      (arrdata) => arrdata._id === e.target.value
                    );

                    setAppointment({
                      ...appointment,
                      necessity: selectedValue?.name,
                    });
                  }}
                  selectedValue={
                    necessityArr.find(
                      (arrdata) => arrdata.name === appointment.necessity
                    )?._id
                  }
                />
              </div>
            </div>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={
              appointment.patient == "" ||
              appointment.doctor == "" ||
              appointment.necessity === ""
            }
            isLoading={createMutating || updateMutating}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDialog;
