import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../../core/types/DropDown";

interface FacilityDetailsProps {
  branchDropdowns: DropDownItem[];
}

const FacilityDetails: React.FC<FacilityDetailsProps> = ({
  branchDropdowns,
}) => {
  const { control, setValue, formState } = useFormContext();
  const { errors } = formState;

  useEffect(() => setValue("currentStep", 2), []);

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="heroicons-outline:office-building"
          title="Facility Details"
        />

        <div className="flex flex-row gap-14">
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // disabled={!editable}
                  minDate={dayjs()}
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Date"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      required: true,
                      helperText: <>{errors?.date?.message}</>,
                      error: !!errors.date,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          {/* Email phone Controller */}
          <Controller
            name="customerMaster"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // disabled={!editable}
                label="Customer Master"
                size="small"
                type="text"
                // className="pr-10"
                // required
              />
            )}
          />

          <Controller
            name="branch"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={branchDropdowns}
                className=""
                getOptionLabel={(option: DropDownItem) =>
                  option ? option.name.toUpperCase() : ""
                }
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Branch"
                    variant="outlined"
                    // required
                    size="small"
                    helperText={<>{errors.branch?.message}</>}
                    error={!!errors.branch}
                  />
                )}
              />
            )}
          />

          {/* arm code Controller */}
          <Controller
            name="armCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // disabled={!editable}
                label="Arm Code"
                size="small"
                type="text"
                // className="pr-10"
                // required
              />
            )}
          />

          {/* segment code Controller */}
          <Controller
            name="segmentCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // disabled={!editable}
                label="Segment Code"
                size="small"
                type="text"
                // className="pr-10"
                // required
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default FacilityDetails;
