import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../core/types/DropDown";

interface ApplicationSummaryProps {
  editable: boolean;
  sourceTypeDropdowns?: DropDownItem[];
  cardTypeDropdowns?: DropDownItem[];
  titleTypeDropdowns?: DropDownItem[];
  companyDropdowns?: DropDownItem[];
}

const ApplicationSummary: React.FC<ApplicationSummaryProps> = ({
  editable,
  sourceTypeDropdowns,
  cardTypeDropdowns,
}) => {
  const { control, watch, setValue } = useFormContext();

  //   TODO - Remove this on implementation
  useEffect(() => {
    setValue("isApplicantNicPrimary", true);
  }, []);

  const isApplicantNicPrimary = watch("isApplicantNicPrimary");

  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader icon="feather:file-text" title="Application Summary" />

      <div className="grid grid-cols-2 gap-9">
        <div className="flex flex-col gap-9">
          {/* Source Type Controller */}
          <Controller
            name="sourceType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={sourceTypeDropdowns || []}
                disabled={!editable}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Source Type"
                    variant="outlined"
                    // required
                    size="small"
                  />
                )}
              />
            )}
          />

          {/* Card Type Controller */}
          <Controller
            name="creditCardType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={cardTypeDropdowns || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Card Type"
                    variant="outlined"
                    // required
                    size="small"
                  />
                )}
              />
            )}
          />

          {/* Applicant First Name Controller */}
          <Controller
            name="applicantFirstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Applicant First Name"
                size="small"
                type="text"
                className=""
                // required
              />
            )}
          />

          {/* Applicant NIC Controller */}
          {/* <Controller
            name={isApplicantNicPrimary ? "applicantNic" : "applicantEic"}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label={isApplicantNicPrimary ? "Old NIC" : "New NIC"}
                size="small"
                type="text"
                // required
              />
            )}
          /> */}

          <Controller
            name={"applicantNic"}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label={"NIC No"}
                size="small"
                type="text"
                // required
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-9">
          {/* DOB Controller */}
          <Controller
            name="applicantDateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={!editable}
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Date of Birth"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      // error: !!errors.dateOfBirth,
                      // helperText: <>{errors?.dateOfBirth?.message}</>,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
          {/* Street 1 Controller */}
          <Controller
            name="applicantResAddress1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Residential Address"
                size="small"
                type="text"
                // className="pr-10"
                // required
              />
            )}
          />
          <div className="flex flex-row gap-9">
            {/* Res tel Controller */}
            <Controller
              name="residentialTelephoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Residential Telephone Number"
                  size="small"
                  type="text"
                  // className="pr-10"
                  // required
                />
              )}
            />

            {/* Mobile phone Controller */}
            <Controller
              name="mobileNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Residential Telephone Number"
                  size="small"
                  type="text"
                  // className="pr-10"
                  // required
                />
              )}
            />
          </div>

          {/* Application date time Controller */}
          <Controller
            name="applicationDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={!editable}
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Application Date"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      // error: !!errors.dateOfBirth,
                      // helperText: <>{errors?.dateOfBirth?.message}</>,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </div>
      </div>
    </Paper>
  );
};

export default ApplicationSummary;
