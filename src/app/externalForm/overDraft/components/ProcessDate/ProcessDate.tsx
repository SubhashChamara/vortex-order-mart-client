import { Paper } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface ProcessDateProps {
  editable: boolean;
}

const ProcessDate: React.FC<ProcessDateProps> = ({ editable }) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  return (
    <div className="h-full">
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:calendar" title="Process Date" />

        <Controller
          name="processDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={!editable}
                minDate={dayjs().add(1, "day")}
                views={["day", "month", "year"]}
                format="DD-MM-YYYY"
                value={value ? dayjs(value) : null}
                label="Reprocess Date"
                onChange={(newValue) => {
                  const dateOnly = newValue
                    ? dayjs(newValue).endOf("day").toDate()
                    : null;
                  onChange(dateOnly);
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    error: !!errors.processDate,
                    helperText: <>{errors?.processDate?.message}</>,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Paper>
    </div>
  );
};

export default ProcessDate;
