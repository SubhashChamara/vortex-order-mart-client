import { Autocomplete, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { DropDownItem } from "../../../../../core/types/DropDown";

interface PersonalAndContactFormProps {
  userType: "primary" | "joint";
  editable: boolean;
  applicationTypeDropdowns: DropDownItem[];
  termLoanTypeDropdowns: DropDownItem[];
  overDraftTypeDropdowns: DropDownItem[];
  titleDropdowns: DropDownItem[];
}

const PersonalAndContactFormJoint: React.FC<PersonalAndContactFormProps> = ({
  userType,
  editable,
  applicationTypeDropdowns,
  termLoanTypeDropdowns,
  overDraftTypeDropdowns,
  titleDropdowns,
}) => {
  const { control, watch, setValue, formState } = useFormContext();
  const { errors } = formState;

  const applicationType = watch("applicationType");

  useEffect(() => {
    setValue("currentStep", 1);
  }, []);

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:user"
          title="Personal and Contact Information"
        />

        <div className="flex flex-col gap-14">
          {/* title and name */}
          <div className="flex flex-row gap-14">
            {/* title controller */}
            <Controller
              name={`jointTitle`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={titleDropdowns}
                  className="basis-1/4"
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
                      required
                      label="Title"
                      variant="outlined"
                      // required
                      size="small"
                      helperText={<>{errors.jointTitle?.message}</>}
                      error={!!errors.jointTitle}
                    />
                  )}
                />
              )}
            />
            {/* name controller */}
            <Controller
              name={`jointName`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  disabled={!editable}
                  label="Name"
                  size="small"
                  type="text"
                  helperText={<>{errors.jointName?.message}</>}
                  error={!!errors.jointName}
                />
              )}
            />
          </div>

          {/* dob & nic */}
          <div className="flex flex-row gap-14">
            {/* DOB Controller */}
            <Controller
              name={`jointDob`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // className="basis-1/2 pr-10"
                    maxDate={dayjs().subtract(1, "day")}
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
                        required: true,
                        helperText: <>{errors?.jointDob?.message}</>,
                        error: !!errors.jointDob,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />

            {/* nic / passport controller */}
            <Controller
              name={`jointNicPP`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  disabled={!editable}
                  label="NIC / Passport Number"
                  size="small"
                  type="text"
                  helperText={<>{errors.jointNicPP?.message}</>}
                  error={!!errors.jointNicPP}
                />
              )}
            />
          </div>
          {/* nationality & email */}
          <div className="flex flex-row gap-14">
            {/* nationality controller */}
            <Controller
              name={`jointNationality`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Current Nationality"
                  size="small"
                  type="text"
                />
              )}
            />
            {/* email controller */}
            <Controller
              name={`jointEmail`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  disabled={!editable}
                  label="Email"
                  size="small"
                  type="text"
                  helperText={<>{errors.jointEmail?.message}</>}
                  error={!!errors.jointEmail}
                />
              )}
            />
          </div>
          {/* mobile & tel no */}
          <div className="flex flex-row gap-14">
            {/* mobile controller */}
            <Controller
              name={`jointMobile`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  disabled={!editable}
                  label="Mobile"
                  size="small"
                  type="text"
                  inputProps={{
                    maxLength: 10, // Restrict input length to 10 characters
                  }}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    field.onChange(e);
                  }}
                  helperText={<>{errors.jointMobile?.message}</>}
                  error={!!errors.jointMobile}
                />
              )}
            />
            {/* email controller */}
            <Controller
              name={`jointResTelNo`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Tel.No.(Residence)"
                  size="small"
                  type="text"
                  inputProps={{
                    maxLength: 10, // Restrict input length to 10 characters
                  }}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    field.onChange(e);
                  }}
                  helperText={<>{errors.jointResTelNo?.message}</>}
                  error={!!errors.jointResTelNo}
                />
              )}
            />
          </div>
          {/* occupation controller */}
          <Controller
            name={`jointOccupation`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                className="basis-1/2"
                label="Occupation"
                size="small"
                type="text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(
                    /[^a-zA-Z\s()-]/g,
                    ""
                  ); // Allow letters, spaces, () and -
                  field.onChange(e);
                }}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default PersonalAndContactFormJoint;
