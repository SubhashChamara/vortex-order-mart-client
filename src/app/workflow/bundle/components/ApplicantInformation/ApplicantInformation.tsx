import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { DropDownItem } from "../../../../core/types/DropDown";

interface ApplicantInformationProps {
  editable: boolean;
  sourceTypeDropdowns?: DropDownItem[];
  cardTypeDropdowns?: DropDownItem[];
  titleTypeDropdowns?: DropDownItem[];
}

const ApplicantInformation: React.FC<ApplicantInformationProps> = ({
  editable,
  sourceTypeDropdowns,
  cardTypeDropdowns,
  titleTypeDropdowns,
}) => {
  const methods = useFormContext();

  const { control, formState, setValue } = methods;
  const { errors } = formState;

  const calculateAge = (dob: Dayjs | null): string => {
    if (!dob) return "";
    const today = dayjs();
    const birthDate = dayjs(dob);
    const age = today.diff(birthDate, "year");
    return age.toString();
  };

  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader icon="feather:user" title="Applicant Information" />
      <div className="">
        {/* Left */}
        <div className="flex flex-col gap-9">
          <div className="flex flex-row border-b border-b-gray-400 pb-12 gap-9">
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
                      required
                      size="small"
                      helperText={<>{errors.sourceType?.message}</>}
                      error={!!errors.sourceType}
                    />
                  )}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9 mt-4">
            {/* Applicants Title Controller */}
            <div className="flex flex-row gap-9 basis-1/2">
              <Controller
                name="applicantTitle"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    className="basis-1/3"
                    disabled={!editable}
                    options={titleTypeDropdowns || []}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    isOptionEqualToValue={(option, val) => option.id === val.id}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Title"
                        variant="outlined"
                        size="small"
                        required
                        helperText={<>{errors.applicantTitle?.message}</>}
                        error={!!errors.applicantTitle}
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
                    className="basis-2/3"
                    required
                    helperText={<>{errors.applicantFirstName?.message}</>}
                    error={!!errors.applicantFirstName}
                  />
                )}
              />
            </div>

            {/* Applicant Last Name Controller */}
            <Controller
              name="applicantLastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Applicant Last Name"
                  size="small"
                  type="text"
                  className="basis-1/2"
                  helperText={<>{errors.applicantLastName?.message}</>}
                  error={!!errors.applicantLastName}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9">
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

                      const age = calculateAge(newValue);
                      setValue("applicantAge", age);
                    }}
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        size: "small",
                        error: !!errors.applicantDateOfBirth,
                        helperText: (
                          <>{errors?.applicantDateOfBirth?.message}</>
                        ),
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />

            <Controller
              name="applicantAge"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Applicant Age"
                  size="small"
                  type="text"
                  className="basis-1/3"
                  sx={{
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        display: "none",
                      },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                  }}
                  // required
                  helperText={<>{errors.refereeName?.message}</>}
                  error={!!errors.refereeName}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9">
            {/* Street 1 Controller */}
            <Controller
              name="applicantResAddress1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Address 1"
                  size="small"
                  type="text"
                  // className="pr-10"
                  // required
                  helperText={<>{errors.applicantResAddress1?.message}</>}
                  error={!!errors.applicantResAddress1}
                />
              )}
            />

            {/* Street 2 Controller */}
            <Controller
              name="applicantResAddress2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Address 2"
                  size="small"
                  type="text"
                  // className="pr-10"
                  // required
                  helperText={<>{errors.applicantResAddress2?.message}</>}
                  error={!!errors.applicantResAddress2}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9">
            {/* City Controller */}
            <Controller
              name="applicantResAddress3"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Address 3"
                  size="small"
                  type="text"
                  // className="pr-10"
                  // required
                  helperText={<>{errors.applicantResAddress3?.message}</>}
                  error={!!errors.applicantResAddress3}
                />
              )}
            />

            {/* Province Controller */}
            <Controller
              name="applicantResAddressCity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="City"
                  size="small"
                  type="text"
                  // className="pr-10"
                  // required
                  helperText={<>{errors.applicantResAddressCity?.message}</>}
                  error={!!errors.applicantResAddressCity}
                />
              )}
            />
          </div>

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
                  inputProps={{
                    maxLength: 10,
                  }}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 10);
                    field.onChange(value);
                  }}
                  helperText={<>{errors.residentialTelephoneNumber?.message}</>}
                  error={!!errors.residentialTelephoneNumber}
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
                  inputProps={{
                    maxLength: 10,
                  }}
                  onChange={(e) => {
                    const value = e.target.value.slice(0, 10);
                    field.onChange(value);
                  }}
                  helperText={<>{errors.mobileNumber?.message}</>}
                  error={!!errors.mobileNumber}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9">
            {/* Email phone Controller */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Email"
                  size="small"
                  type="text"
                  // className="pr-10"
                  required
                  helperText={<>{errors.email?.message}</>}
                  error={!!errors.email}
                />
              )}
            />

            {/* Application date time Controller */}
            <Controller
              name="applicationDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    disabled={!editable}
                    views={["day", "month", "year", "hours", "minutes"]}
                    format="DD-MM-YYYY HH:mm"
                    value={value ? dayjs(value) : null}
                    label="Application Date"
                    minDate={dayjs()}
                    onChange={(newValue) => {
                      const localDateTime = newValue
                        ? dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss")
                        : null;
                      onChange(localDateTime);
                    }}
                    ampm={false}
                    slotProps={{
                      textField: {
                        size: "small",
                        required: true,
                        error: !!errors.applicationDate,
                        helperText: <>{errors?.applicationDate?.message}</>,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </div>

        {/* Right */}
      </div>
    </Paper>
  );
};

export default ApplicantInformation;
