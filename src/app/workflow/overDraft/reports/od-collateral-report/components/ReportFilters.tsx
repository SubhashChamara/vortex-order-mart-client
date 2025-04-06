import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../../@helpers/Logger";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { ProcessStatusInfo } from "../../../../../core/types/ProcessStatusInfo";
import { Api } from "../../../../../../api/Api";

export type ReportFilters = {
  fromDate: Date | null;
  toDate: Date | null;
  facilityAccNum: string | null;
  status: ProcessStatusInfo | null;
};

type ReportFiltersProps = {
  handlePassFilters: (form: ReportFilters) => void;
  title: string;
};

const defaultValues: ReportFilters = {
  fromDate: dayjs().startOf("month").toDate(),
  toDate: dayjs().toDate(),
  facilityAccNum: "",
  status: { id: "ALL", name: "ALL" },
};

const schema = z.object({
  fromDate: z
    .instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Start Date is required",
    }),
  toDate: z
    .instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), {
      message: "End Date is required",
    }),
  facilityAccNum: z.string().optional().default(""),
  status: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

const ReportFilters: FC<ReportFiltersProps> = ({
  handlePassFilters,
  title,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    dayjs().startOf("month").toDate()
  );
  const [processStatusList, setProcessStatusList] = useState<
    ProcessStatusInfo[]
  >([]);
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, getValues } =
    useForm<ReportFilters>({
      mode: "onSubmit",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;

  //change to fetch collateral report status
  // const handleFetchProcessStatusList = async () => {
  //   const { data, err } = await Api.performRequest((r) => r.reports.getODstatus());
  //   Logger.debug(`(Proc Status List) => { DATA: ${JSON.stringify(data)}, ERROR: ${JSON.stringify(err)} }`);

  //   if (data !== null) {
  //     const updatedData = [{ id: "ALL", name: "ALL" }, ...data];
  //     setProcessStatusList(updatedData);
  //   }
  // };

  // useEffect(() => {
  //   handleFetchProcessStatusList();
  // }, []);

  const handleOnSubmit = () => {
    const formData = getValues(); // get the latest form data
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    handlePassFilters(formData); // Pass latest form values
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
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${mobileOpen && isMobile
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

          {/* Facility Account Number */}
          <Controller
            name="facilityAccNum"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Facility Account Number"
                size="small"
                type="text"
              />
            )}
          />

          {/* Status Dropdown */}
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={processStatusList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.status}
                    helperText={errors?.status?.message}
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
