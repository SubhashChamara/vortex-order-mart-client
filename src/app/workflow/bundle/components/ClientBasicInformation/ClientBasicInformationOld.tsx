import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

export interface ClientBasicInformationProps {
  editable: boolean;
}

const ClientBasicInformation2: React.FC<ClientBasicInformationProps> = ({
  editable,
}) => {
  const methods = useFormContext();

  const { control } = methods;

  const options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];

  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader icon="feather:user" title="Client Basic Information" />
        <div className="grid grid-cols-2 gap-12">
          {/* left side */}
          <div className="flex flex-col gap-9">
            {/* Group sale controller */}
            <div className="w-full flex flex-row justify-between items-center">
              <p>Group Sale</p>
              <Controller
                name="isGroupSale"
                control={control}
                disabled={!editable}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label=""
                  />
                )}
              />
            </div>

            {/* Group Reference Controller */}
            <Controller
              name="reqLoanAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!editable}
                  label="Group Reference"
                  size="small"
                  type="text"
                  className="pr-10"
                  // required
                />
              )}
            />
            <div className="flex flex-row">
              {/* Source Type Controller */}
              <Controller
                name="sourceType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={options}
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
                        className="pr-10"
                      />
                    )}
                  />
                )}
              />

              {/* Card Type Controller */}
              <Controller
                name="cardType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    disabled={!editable}
                    options={options}
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
                        className="pr-10"
                      />
                    )}
                  />
                )}
              />
            </div>

            <div className="flex flex-row gap-9 pr-10">
              {/* Applicants Title Controller */}
              <div className="flex flex-row gap-9 basis-1/2">
                <Controller
                  name="applicantTitle"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      className="basis-1/3"
                      disabled={!editable}
                      options={options}
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
                          label="Title"
                          variant="outlined"
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
                      className="basis-2/3"
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
                  />
                )}
              />
            </div>

            <div className="justify-center p-9 border border-gray-400 h-full rounded-md mr-10">
              <div className="flex flex-col gap-9">
                <div className="w-full flex flex-row justify-between pb-9">
                  <p>Applicant NIC Number</p>
                  <p>Primary ID</p>
                </div>

                {/* old nic row*/}
                <div className="flex flex-row w-full gap-12">
                  {/* Applicant NIC Controller */}
                  <Controller
                    name="applicantNic"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={!editable}
                        label="Old NIC"
                        size="small"
                        type="text"
                        className="pr-10"
                        // required
                      />
                    )}
                  />

                  {/* Checkbox Controller */}
                  <Controller
                    name="isApplicantNicPrimary"
                    control={control}
                    disabled={!editable}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label=""
                      />
                    )}
                  />
                </div>

                {/* new nic row */}
                <div className="flex flex-row w-full gap-12">
                  {/* Applicant EIC Controller */}
                  <Controller
                    name="applicantEic"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={!editable}
                        label="New NIC (EIC)"
                        size="small"
                        type="text"
                        className="pr-10"
                        // required
                      />
                    )}
                  />

                  {/* Checkbox Controller */}
                  <Controller
                    name="isApplicantEicPrimary"
                    control={control}
                    disabled={!editable}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label=""
                      />
                    )}
                  />
                </div>

                {/* additional nic row */}
                <div className="flex flex-row w-full gap-12">
                  {/* Applicant Additional NIC Controller */}
                  <Controller
                    name="applicantAdditionalNic"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={!editable}
                        label="Old NIC"
                        size="small"
                        type="text"
                        className="pr-10"
                        // required
                      />
                    )}
                  />

                  {/* Checkbox Controller */}
                  <Controller
                    name="isApplicantAdditionalNicPrimary"
                    control={control}
                    disabled={!editable}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label=""
                      />
                    )}
                  />
                </div>

                {/* additional eic row */}
                <div className="flex flex-row w-full gap-12">
                  {/* Applicant Additional EIC Controller */}
                  <Controller
                    name="applicantAdditionalEic"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={!editable}
                        label="Old Additional NIC"
                        size="small"
                        type="text"
                        className="pr-10"
                        // required
                      />
                    )}
                  />

                  {/* Checkbox Controller */}
                  <Controller
                    name="isApplicantAdditionalEicPrimary"
                    control={control}
                    disabled={!editable}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label=""
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="flex flex-col gap-9">
            <div className="flex flex-row gap-9">
              {/* Applicant Passport Controller */}
              <Controller
                name="applicantAdditionalEic"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Applicant Passport Number"
                    size="small"
                    type="text"
                    // required
                  />
                )}
              />
              {/* DOB Controller */}
              <Controller
                name="dateOfBirth"
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
            </div>

            <div className="flex flex-row gap-10">
              {/* Street 1 Controller */}
              <Controller
                name="applicantResAddress1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Street 1"
                    size="small"
                    type="text"
                    // className="pr-10"
                    // required
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
                    label="Street 2"
                    size="small"
                    type="text"
                    // className="pr-10"
                    // required
                  />
                )}
              />
            </div>

            <div className="flex flex-row gap-10">
              {/* City Controller */}
              <Controller
                name="applicantResAddress1"
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
                  />
                )}
              />

              {/* Province Controller */}
              <Controller
                name="applicantResAddress2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Province"
                    size="small"
                    type="text"
                    // className="pr-10"
                    // required
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
                    // required
                  />
                )}
              />

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

            <p>Company Information</p>

            <div className="w-full h-full flex flex-col gap-9">
              {/* Company Controller */}
              <Controller
                name="companyName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={options}
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
                        label="Company"
                        variant="outlined"
                        // required
                        size="small"
                        // className="pr-10"
                      />
                    )}
                  />
                )}
              />

              <div className="flex flex-row gap-9 ">
                {/* Company address controller */}
                <Controller
                  name="companyAddressNo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Company Address No"
                      size="small"
                      type="text"
                      // className="pr-10"
                      // required
                    />
                  )}
                />

                {/* Company address street 1 controller */}
                <Controller
                  name="companyAddressStreet1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Company Address Street 1"
                      size="small"
                      type="text"
                      // className="pr-10"
                      // required
                    />
                  )}
                />
              </div>
              <div className="flex flex-row gap-9 ">
                {/* Company address street 2 controller */}
                <Controller
                  name="companyAddressStreet2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Company Address Street 2"
                      size="small"
                      type="text"
                      // className="pr-10"
                      // required
                    />
                  )}
                />

                {/* Company address area controller */}
                <Controller
                  name="companyAddressCity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Company Address Area"
                      size="small"
                      type="text"
                      // className="pr-10"
                      // required
                    />
                  )}
                />
              </div>

              <div className="flex flex-row gap-9 ">
                {/* Company telephone */}
                <Controller
                  name="companyTelephone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Company Telephone"
                      size="small"
                      type="number"
                      // className="pr-10"
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
                    />
                  )}
                />

                {/* Company telephone */}
                <Controller
                  name="basicSalary"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Basic Salary"
                      size="small"
                      type="number"
                      // className="pr-10"
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
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ClientBasicInformation2;
