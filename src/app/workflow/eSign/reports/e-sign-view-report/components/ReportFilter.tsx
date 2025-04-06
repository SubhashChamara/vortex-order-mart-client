import { FC, useEffect, useState } from "react";
import { BranchInfo } from "../../../../../core/types/BranchInfo";
import { ApproverInfo } from "../models/ApproverInfo";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InvokerInfo } from "../models/InvokerInfo";
import { Api } from "../../../../../../api/Api";
import Logger from "../../../../../../@helpers/Logger";

export type ReportFilters = {
  fromDate: Date | null;
  toDate: Date | null;
  branch: BranchInfo | null;
  approver: ApproverInfo | null;
  wfRef: string;
  nic: string;
  customerAcNo: string;
  customerCardNo: string;
  invoker: InvokerInfo | null;
};

type ReportFiltersProps = {
  handlePassFilters: (form: ReportFilters) => void;
  title: string;
};

const ReportFilters: FC<ReportFiltersProps> = ({
  handlePassFilters,
  title,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    dayjs().startOf("month").toDate()
  );
  const [getProcessBranchList, setProcessBranchList] = useState<BranchInfo[]>(
    []
  );

  const [invokerList, setInvokerList] =useState([
    { id: "", name: "" }
  ]);

  const [approverList, setApproverList] =useState([
    { id: "", name: "" }
  ]);


  const defaultValues: ReportFilters = {
    fromDate: dayjs().startOf("month").toDate(),
    toDate: dayjs().toDate(),
    branch: "",
    approver: "",
    wfRef: "",
    nic: "",
    customerAcNo: "",
    customerCardNo: "",
    invoker: "",
  };

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleFetchApprovedUserList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getApprovedUserList()
    );

    Logger.debug(
      "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setInvokerList(data);
    }
  };

  const handleFetchInvokerList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getApproverList()
    );

    Logger.debug(
      "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setApproverList(data);
    }
  };

  const { control, handleSubmit, formState, getValues } =
    useForm<ReportFilters>({
      mode: "onSubmit",
      defaultValues,
    });
  const { errors } = formState;

  const handleFetchBranchList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getBranchList()
    );
    Logger.debug(
      `(Proc Status List) => { DATA: ${JSON.stringify(
        data
      )}, ERROR: ${JSON.stringify(err)} }`
    );

    if (data !== null) {
      console.log(data);
      const updatedData = [
        { id: "", name: "" },
        ...data.map((item: BranchInfo) => ({
          ...item,
          id: item.id.toString(),
        })),
      ];
      setProcessBranchList(updatedData);
    }
  };

  useEffect(() => {
    handleFetchBranchList();
    handleFetchApprovedUserList();
    handleFetchInvokerList();
  }, []);

  const handleOnSubmit = () => {
    const formData = getValues(); // get the latest form data
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    handlePassFilters(formData); // Pass latest form values
    console.log(formData)
  };

  return (
    <Paper className="my-12 p-6">
      <div className="flex pb-6">
        <EdgeSvgIcon
          className="icon-size-28 cursor-pointer text-red-600"
          color="error"
        >
          feather:file-text
        </EdgeSvgIcon>
        <div className="text-red-600 font-bold flex-col pl-6">
          <div>{title} Report</div>
          <div className="text-[12px] text-gray">
            This report provides {title} information
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6"
              : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
          } lg:grid-cols-5`}
        >
          {/* From Date Picker */}
          <Controller
            name="fromDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year", "month", "day"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Start Date"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                    setStartDate(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.fromDate,
                      helperText: <>{errors?.fromDate?.message}</>,
                    },
                  }}
                  maxDate={dayjs()}
                />
              </LocalizationProvider>
            )}
          />

          {/* To Date Picker */}
          <Controller
            name="toDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="End Date"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.toDate,
                      helperText: <>{errors?.toDate?.message}</>,
                    },
                  }}
                  maxDate={dayjs()}
                  minDate={startDate ? dayjs(startDate) : undefined}
                />
              </LocalizationProvider>
            )}
          />

          {/* Status Dropdown */}
          <Controller
            name="branch"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={getProcessBranchList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value?.name ? { id: value.id, name: value.name } : null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.branch}
                    helperText={errors?.branch?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name="approver"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={approverList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value?.name ? { id: value.id, name: value.name } : null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Approver"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.approver}
                    helperText={errors?.approver?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name="wfRef"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Workflow Ref"
                size="small"
                type="text"
              />
            )}
          />

          <Controller
            name="nic"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="NIC" size="small" type="text" />
            )}
          />

          <Controller
            name="customerAcNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Customer A/C Number"
                size="small"
                type="text"
              />
            )}
          />

          <Controller
            name="customerCardNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Customer Card Number"
                size="small"
                type="text"
              />
            )}
          />

          <Controller
            name="invoker"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={invokerList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value?.name ? { id: value.id, name: value.name } : null}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Invoker"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.invoker}
                    helperText={errors?.invoker?.message}
                  />
                )}
              />
            )}
          />

          {/* Submit Button */}
          <div className=" justify-end p-2">
            <Button aria-label="Submit" type="submit">
              <EdgeSvgIcon
                className="icon-size-12 cursor-pointer text-white mr-3"
                color="error"
              >
                feather:search
              </EdgeSvgIcon>
              Search
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default ReportFilters;
