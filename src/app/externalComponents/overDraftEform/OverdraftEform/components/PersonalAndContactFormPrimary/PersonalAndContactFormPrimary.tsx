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
  applicationTypeDropdowns: DropDownItem[];
  termLoanTypeDropdowns: DropDownItem[];
  overDraftTypeDropdowns: DropDownItem[];
  titleDropdowns: DropDownItem[];
}

const PersonalAndContactFormPrimary: React.FC<PersonalAndContactFormProps> = ({
  userType,
  applicationTypeDropdowns,
  termLoanTypeDropdowns,
  overDraftTypeDropdowns,
  titleDropdowns,
}) => {
  const { control, watch, resetField, formState, setValue } = useFormContext();
  const { errors } = formState;

  const applicationType = watch("applicationType");

  useEffect(() => {
    setValue("currentStep", 0);
  }, []);

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:user"
          title="Personal and Contact Information"
        />

        <div className="flex flex-col gap-14">
          {userType == "primary" && (
            <div className="flex flex-row gap-14">
              <Controller
                name="applicationType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={applicationTypeDropdowns}
                    //   disabled={!editable}
                    className=""
                    getOptionLabel={(option) => (option ? option.name : "")}
                    isOptionEqualToValue={(option, val) => option.id === val.id}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                      resetField("termLoanType");
                      resetField("overDraftType");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Application Type"
                        variant="outlined"
                        size="small"
                        helperText={<>{errors.applicationType?.message}</>}
                        error={!!errors.applicationType}
                      />
                    )}
                  />
                )}
              />
              {applicationType && applicationType.id == "OVER_DRAFT" ? (
                <Controller
                  name="overDraftType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={overDraftTypeDropdowns}
                      className=""
                      getOptionLabel={(option) => (option ? option.name : "")}
                      isOptionEqualToValue={(option, val) =>
                        option.id === val.id
                      }
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Over Draft Type"
                          variant="outlined"
                          size="small"
                          helperText={<>{errors.overDraftType?.message}</>}
                          error={!!errors.overDraftType}
                        />
                      )}
                    />
                  )}
                />
              ) : (
                <Controller
                  name="termLoanType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={termLoanTypeDropdowns}
                      className=""
                      getOptionLabel={(option) => (option ? option.name : "")}
                      isOptionEqualToValue={(option, val) =>
                        option.id === val.id
                      }
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Term Loan Type"
                          variant="outlined"
                          // required
                          size="small"
                          helperText={<>{errors.termLoanType?.message}</>}
                          error={!!errors.termLoanType}
                        />
                      )}
                    />
                  )}
                />
              )}
            </div>
          )}

          {/* title and name */}
          <div className="flex flex-row gap-14">
            {/* title controller */}
            <Controller
              name={`primaryTitle`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={titleDropdowns}
                  className="basis-1/4"
                  getOptionLabel={(option) => (option ? option.name : "")}
                  isOptionEqualToValue={(option, val) => option.id === val.id}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // required
                      label="Title"
                      variant="outlined"
                      required
                      size="small"
                      helperText={<>{errors.primaryTitle?.message}</>}
                      error={!!errors.primaryTitle}
                    />
                  )}
                />
              )}
            />
            {/* name controller */}
            <Controller
              name={`primaryName`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  required
                  label="Name"
                  size="small"
                  type="text"
                  helperText={<>{errors.primaryName?.message}</>}
                  error={!!errors.primaryName}
                />
              )}
            />
          </div>

          {/* dob & nic */}
          <div className="flex flex-row gap-14">
            {/* DOB Controller */}
            <Controller
              name={`primaryDob`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // className="basis-1/2 pr-10"
                    // disabled={!editable}
                    views={["day", "month", "year"]}
                    format="DD-MM-YYYY"
                    value={value ? dayjs(value) : null}
                    label="Date of Birth"
                    maxDate={dayjs().subtract(1, "day")}
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
                        helperText: <>{errors?.primaryDob?.message}</>,
                        error: !!errors.primaryDob,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />

            {/* nic / passport controller */}
            <Controller
              name={`primaryNicPP`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  required
                  label="NIC / Passport Number"
                  size="small"
                  type="text"
                  helperText={<>{errors.primaryNicPP?.message}</>}
                  error={!!errors.primaryNicPP}
                />
              )}
            />
          </div>
          {/* nationality & email */}
          <div className="flex flex-row gap-14">
            {/* nationality controller */}
            <Controller
              name="primaryNationality"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Current Nationality"
                  size="small"
                  type="text"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
                    field.onChange(e);
                  }}
                  helperText={<>{errors.primaryNationality?.message}</>}
                  error={!!errors.primaryNationality}
                />
              )}
            />
            {/* email controller */}
            <Controller
              name={`primaryEmail`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  required
                  label="Email"
                  size="small"
                  type="text"
                  helperText={<>{errors.primaryEmail?.message}</>}
                  error={!!errors.primaryEmail}
                />
              )}
            />
          </div>
          {/* mobile & tel no */}
          <div className="flex flex-row gap-14">
            {/* mobile controller */}
            <Controller
              name="primaryMobile"
              control={control}
              rules={{
                required: "Mobile No. is required",
                minLength: {
                  value: 10,
                  message: "Mobile No. must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Mobile No. must be 10 digits",
                },
                validate: (value) =>
                  /^\d+$/.test(value) || "Mobile No. must contain only numbers",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
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
                  helperText={<>{errors.primaryMobile?.message}</>}
                  error={!!errors.primaryMobile}
                />
              )}
            />

            {/* res tel controller */}
            <Controller
              name={`primaryResTelNo`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
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
                  helperText={<>{errors.primaryResTelNo?.message}</>}
                  error={!!errors.primaryResTelNo}
                />
              )}
            />
          </div>

          {/* Occupation Controller */}
          <Controller
            name={`primaryOccupation`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="basis-1/2"
                label="Occupation"
                size="small"
                type="text"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
                  field.onChange(e);
                }}
                helperText={<>{errors.primaryOccupation?.message}</>}
                error={!!errors.primaryOccupation}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default PersonalAndContactFormPrimary;
