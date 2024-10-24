import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import CustomDatePicker from "@/components/selectors/CustomDatePicker/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { getFilterData, insertFilterData } from "@/redux/slices/appointment";
import { insertFilterView } from "@/redux/slices/layout";
import { defaultFilter } from "@/utils/staticData";
import {
  Box,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  open: boolean;
  closeDialog: () => void;
  filterUrl: string;
  setFilterUrl: (data: string) => void;
}
const FilterDialog = ({
  open,
  closeDialog,
  filterUrl,
  setFilterUrl,
}: Props) => {
  const dispatch = useDispatch();
  const getFilter = useSelector(getFilterData);
  const [checkedLatestFirst, setCheckedLatestFirst] = useState(false);
  const [checkedNecessity, setCheckedNecessity] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [checkedRange, setCheckedRange] = useState(false);
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);

  const [additionalFilter, setAdditionalFilter] =
    useState<AdditionalFilter>(defaultFilter);

  const clearChecked = () => {
    setCheckedLatestFirst(false);
    setCheckedNecessity(false);
    setCheckedStatus(false);
    setCheckedRange(false);
    setAdditionalFilter(defaultFilter);
  };

  const handleClose = () => {
    if (filterUrl.length > 0) {
      closeDialog();
      setAdditionalFilter(getFilter);
      setCheckedLatestFirst(getFilter.nearestAppointment);
      setCheckedNecessity(getFilter.necessity.length ? true : false);
      setCheckedStatus(getFilter.status.length ? true : false);
      setCheckedRange(
        getFilter.start.length && getFilter.end.length ? true : false
      );
      getFilter.start ? setStart(dayjs(getFilter.start)) : setStart(null);
      getFilter.end ? setEnd(dayjs(getFilter.end)) : setEnd(null);
    } else {
      dispatch(insertFilterView(false));
      clearChecked();
      closeDialog();
      setStart(null);
      setEnd(null);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      scroll="paper"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle align="center" className="dark:bg-[#3C3C3C] w-full">
        <Typography
          variant="body1"
          className="text-whiteText dark:text-darkText font-bold"
        >
          Filter Appointment
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers={true}
        className="flex flex-col dark:bg-[#3C3C3C] p-4"
      >
        <Box className="flex flex-col md:flex-row md:space-x-4">
          <CloseButton handleClose={handleClose} />
          <Box className="flex-grow mt-4 md:mt-0">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedLatestFirst}
                    onChange={(e) => {
                      setCheckedLatestFirst(e.target.checked);
                      setAdditionalFilter({
                        ...additionalFilter,
                        nearestAppointment: e.target.checked,
                      });
                    }}
                  />
                }
                label="Show Nearest Appointment First"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedNecessity}
                    onChange={(e) => {
                      setCheckedNecessity(e.target.checked);
                      if (!e.target.checked) {
                        setAdditionalFilter({
                          ...additionalFilter,
                          necessity: "",
                        });
                      }
                    }}
                  />
                }
                label="Filter by Necessity"
              />
              {checkedNecessity ? (
                <div className="flex items-center space-x-2 my-2 ml-8">
                  {["Consultation", "Check-Up", "Disease"].map(
                    (reason: string) => (
                      <Chip
                        key={reason}
                        label={reason}
                        sx={{ borderRadius: "6px" }}
                        className={`${
                          reason === additionalFilter.necessity
                            ? "bg-primaryBlue-400 hover:bg-primaryBlue-400 text-white"
                            : ""
                        }`}
                        onClick={() => {
                          setAdditionalFilter({
                            ...additionalFilter,
                            necessity: reason,
                          });
                        }}
                      />
                    )
                  )}
                </div>
              ) : (
                <></>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedStatus}
                    onChange={(e) => {
                      setCheckedStatus(e.target.checked);
                      if (!e.target.checked) {
                        setAdditionalFilter({
                          ...additionalFilter,
                          status: "",
                        });
                      }
                    }}
                  />
                }
                label="Filter by Status"
              />
              {checkedStatus ? (
                <div className="flex items-center space-x-2 my-2 ml-8">
                  {["Pending", "In Progress", "Successs"].map(
                    (status: string) => (
                      <Chip
                        key={status}
                        label={status}
                        sx={{ borderRadius: "6px" }}
                        className={`${
                          status === additionalFilter.status
                            ? "bg-primaryBlue-400 hover:bg-primaryBlue-400 text-white"
                            : ""
                        }`}
                        onClick={() => {
                          setAdditionalFilter({
                            ...additionalFilter,
                            status: status,
                          });
                        }}
                      />
                    )
                  )}
                </div>
              ) : (
                <></>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedRange}
                    onChange={(e) => {
                      setCheckedRange(e.target.checked);
                      if (!e.target.checked) {
                        setStart(null);
                        setEnd(null);
                        setAdditionalFilter({
                          ...additionalFilter,
                          start: "",
                          end: "",
                        });
                      }
                    }}
                  />
                }
                label="Filter by Date Range"
              />
              {checkedRange ? (
                <div className="flex items-center ml-6">
                  <div className="flex flex-col mx-2 w-[170px] ">
                    <LabelTypography title="From" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomDatePicker
                        value={start}
                        handleChange={(newValue: Dayjs | null) => {
                          setStart(newValue);
                          setAdditionalFilter({
                            ...additionalFilter,
                            start: newValue?.toISOString() as string,
                          });
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="flex flex-col mx-2 w-[170px] ">
                    <LabelTypography title="End" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <CustomDatePicker
                        value={end}
                        handleChange={(newValue: Dayjs | null) => {
                          setEnd(newValue);
                          setAdditionalFilter({
                            ...additionalFilter,
                            end: newValue?.toISOString() as string,
                          });
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </FormGroup>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto w-full flex items-center justify-center space-x-2">
          <CreateButton
            handleClick={() => {
              clearChecked();
              closeDialog();
              setFilterUrl("");
              dispatch(insertFilterData(defaultFilter));
            }}
            disabled={false}
            isLoading={false}
            showIcon={false}
            text="Clear Filter"
          />

          <CreateButton
            handleClick={() => {
              if (
                additionalFilter.nearestAppointment === false &&
                additionalFilter.necessity == "" &&
                additionalFilter.status == "" &&
                additionalFilter.start == "" &&
                additionalFilter.end == ""
              ) {
                setFilterUrl("");

                dispatch(insertFilterView(false));
              } else {
                const queryParams: string[] = [];

                if (additionalFilter.nearestAppointment) {
                  queryParams.push(
                    `nearest=${additionalFilter.nearestAppointment}`
                  );
                }
                if (additionalFilter.necessity) {
                  queryParams.push(`necessity=${additionalFilter.necessity}`);
                }
                if (additionalFilter.status) {
                  queryParams.push(`status=${additionalFilter.status}`);
                }
                if (additionalFilter.start) {
                  queryParams.push(`start=${additionalFilter.start}`);
                }
                if (additionalFilter.end) {
                  queryParams.push(`end=${additionalFilter.end}`);
                }
                const queryString =
                  queryParams.length > 0 ? queryParams.join("&") : "";
                setFilterUrl(`&${queryString}`);
              }
              dispatch(insertFilterData(additionalFilter));
              closeDialog();
            }}
            disabled={
              (checkedNecessity && additionalFilter.necessity === "") ||
              (checkedStatus && additionalFilter.status === "") ||
              (checkedRange && (!start || !end))
            }
            isLoading={false}
            showIcon={false}
            text="Apply Filter"
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
