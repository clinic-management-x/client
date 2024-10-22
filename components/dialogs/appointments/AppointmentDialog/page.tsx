import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import {
  createAppointment,
  getBookedAppointments,
  updateAppointment,
} from "@/datafetch/appointments/appointment.api";
import { getDoctor, getDoctors } from "@/datafetch/doctors/doctors.api";
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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import LabelTypography from "@/components/typography/LabelTypography/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import TestAutocomplete from "@/components/input/TestAutocomplete/page";
import AppointmentTimePicker from "../AppointmentTimePicker/page";
import {
  getSelectedAppointment,
  insertAvailableDays,
  insertAvailableSchedules,
  insertBookedTimeArr,
  insertSelectedAppointment,
  insertSelectedDoctor,
  insertTimeStamps,
} from "@/redux/slices/appointment";
import { useDispatch, useSelector } from "react-redux";
import { getCustomDay } from "@/utils/calculations";
import dayjs from "dayjs";

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
  const dispatch = useDispatch();
  const selectedAppointment = useSelector(getSelectedAppointment);
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
    dispatch(insertSelectedAppointment(null));
    dispatch(insertSelectedDoctor(null));
    dispatch(insertAvailableSchedules([]));
    dispatch(insertAvailableDays([]));
    dispatch(insertTimeStamps([]));
    setAppointment(defaultAppointmentData);
  };

  // To handle data

  const { trigger, isMutating: createMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${appointmentEndPoint}`,
    createAppointment
  );
  const { trigger: updateTrigger, isMutating: updateMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${appointmentEndPoint}/${edit}`,
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
        closeDialog();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.");
    }
  };

  const getDoctorData = async (id: string) => {
    const data = (await getDoctor(
      `${config.apiBaseUrl}/${doctorEndPoint}/${id}`
    )) as DoctorType;

    const bookedData = await getBookedAppointments(
      `${
        config.apiBaseUrl
      }/${appointmentEndPoint}/booked-appointments?doctor=${id}&appointmentDate=${dayjs(
        selectedAppointment?.appointmentDate
      ).toISOString()}&_id=${selectedAppointment?._id}`
    );

    if (data && bookedData) {
      dispatch(insertSelectedDoctor(data));
      dispatch(
        insertAvailableSchedules(
          data?.schedules?.filter(
            (schedule) =>
              Math.floor(schedule.start / 1440) ==
                getCustomDay(
                  dayjs(selectedAppointment?.appointmentDate).day()
                ) ||
              Math.floor(schedule.end / 1440) ===
                getCustomDay(dayjs(selectedAppointment?.appointmentDate).day())
          ) as ScheduleType[]
        )
      );
      dispatch(
        insertBookedTimeArr(
          bookedData?.map((idata: AppointmentType) =>
            dayjs(idata.appointmentStartTime).format("DD MMM YYYY hh:mm a")
          )
        )
      );
    }
  };

  useEffect(() => {
    if (selectedAppointment) {
      setAppointment({
        ...appointment,
        appointmentDate: selectedAppointment?.appointmentDate,
        appointmentStartTime: selectedAppointment?.appointmentStartTime,
        appointmentEndTime: selectedAppointment?.appointmentEndTime,
        necessity: selectedAppointment?.necessity,
        doctor: selectedAppointment?.doctor._id,
        patient: selectedAppointment?.patient._id,
      });
      getDoctorData(selectedAppointment.doctor._id);
    }
  }, [selectedAppointment]);

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
                {/* {edit ? (
                  <Typography>{appointment.patient}</Typography>
                ) : ( */}
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
                  value={
                    selectedAppointment
                      ? selectedAppointment.patient
                      : undefined
                  }
                />
                {/* )} */}
              </div>
            </div>
            <div className="flex flex-col p-1 space-y-2 mb-4">
              <LabelTypography title="Doctor" />
              <div className="md:w-[300px]">
                <TestAutocomplete
                  dataArr={doctors}
                  dataIndex={"name"}
                  handleChange={async (e: any, newValue: any) => {
                    dispatch(insertSelectedDoctor(newValue));
                    setAppointment({ ...appointment, doctor: newValue._id });
                  }}
                  handleSearch={(e) => {
                    if (e.target.value.length > 3) {
                      doctorMutate();
                    }
                  }}
                  value={
                    selectedAppointment ? selectedAppointment.doctor : undefined
                  }
                />
              </div>
            </div>
            <AppointmentTimePicker
              appointment={appointment}
              setAppointment={setAppointment}
            />
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
            text={edit ? "Update" : "Create"}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDialog;
