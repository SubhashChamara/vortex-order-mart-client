import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import {  Button, Paper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../../@helpers/Logger";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";

export type Filters = {
  fromDate: Date | null;
  toDate: Date | null;
};

type ReportFiltersProps = {
  handlePassFilters: (form: Filters) => void;
  title: string;
};

const defaultValues: Filters = {
  fromDate: dayjs().startOf("month").toDate(),
  toDate: dayjs().toDate(),
};

const schema = z.object({
  fromDate: z.instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), { message: "Start Date is required" }),
  toDate: z.instanceof(Date, { message: "Invalid Date" })
    .refine((date) => !isNaN(date.getTime()), { message: "End Date is required" }),
});

const ReportFilters: FC<ReportFiltersProps> = ({ handlePassFilters, title }) => {
  const [startDate, setStartDate] = useState<Date | null>(dayjs().startOf("month").toDate());
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, getValues } = useForm<Filters>({
    mode: "onSubmit",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;


  const handleOnSubmit = () => {
    const formData = getValues(); // get the latest form data
    Logger.debug(`Bundle User wise Activity Tracker report filter Form Submitted: ${JSON.stringify(formData)}`);
    handlePassFilters(formData); // Pass latest form values
  };

  return (
    <Paper className="my-12 p-6">
      <div className="flex pb-6">
        <EdgeSvgIcon className="icon-size-28 cursor-pointer text-red-600" color="error">
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
          className={`grid grid-cols-1 gap-9 sm:grid-cols-2 md:grid-cols-3 ${mobileOpen && isMobile ? "sm:grid-cols-1 md:grid-cols-2 sm:p-6" : "sm:grid-cols-3 md:grid-cols-1 sm:p-6"
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
                    const dateOnly = newValue ? dayjs(newValue).endOf("day").toDate() : null;
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
                    const dateOnly = newValue ? dayjs(newValue).endOf("day").toDate() : null;
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


          {/* Submit Button */}
          <div className=" justify-end p-2">
            <Button aria-label="Submit" type="submit">
              <EdgeSvgIcon className="icon-size-12 cursor-pointer text-white mr-3" color="error">
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
