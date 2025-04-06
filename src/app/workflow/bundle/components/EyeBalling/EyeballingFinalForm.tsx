import { Autocomplete, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../core/types/DropDown";
import { formatCurrency } from "../../@helpers/Common";

interface EyeballingFinalFormProps {
  editable: boolean;
  customerCategoryDropdown: DropDownItem[];
  industryDropdown: DropDownItem[];
  cityDropdown: DropDownItem[];
  companyTypeDropdown: DropDownItem[];
  professionTypeDropdown: DropDownItem[];
}

const EyeballingFinalForm: React.FC<EyeballingFinalFormProps> = ({
  editable,
  customerCategoryDropdown,
  industryDropdown,
  cityDropdown,
  companyTypeDropdown,
  professionTypeDropdown,
}) => {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Paper className="px-12 pb-10 w-full h-full">
        <Ve3FormHeader
          icon="material-outline:description"
          title="Eyeballing Form"
        />
        <div className="grid grid-cols-2 gap-12">
          {/* Applicant NIC Controller */}
          <Controller
            name="nicPP"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                required
                label="NIC / PP"
                size="small"
                type="text"
                disabled
                // className="pr-10"
                helperText={<>{errors.nicPP?.message}</>}
                error={!!errors.nicPP}
              />
            )}
          />

          {/* Applicant NIC Controller */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                required
                disabled
                label="Name"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.name?.message}</>}
                error={!!errors.name}
              />
            )}
          />

          <div className="col-span-2 flex flex-row items-center gap-3">
            <p className="col-span-2 text-secondary">CRIB Address</p>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Applicant NIC Controller */}
          <Controller
            name="address1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                disabled
                label="Address 1"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.address1?.message}</>}
                error={!!errors.address1}
              />
            )}
          />

          {/* Applicant NIC Controller */}
          <Controller
            name="address2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                disabled
                label="Address 2"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.address2?.message}</>}
                error={!!errors.address2}
              />
            )}
          />

          {/* Applicant NIC Controller */}
          <Controller
            name="address3"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
                //   disabled={!editable}
                label="Address 3"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.address3?.message}</>}
                error={!!errors.address3}
              />
            )}
          />

          {/* Applicant NIC Controller */}
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                disabled
                label="Zip Code"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.zipCode?.message}</>}
                error={!!errors.zipCode}
              />
            )}
          />

          <div className="col-span-2 flex flex-row items-center gap-3">
            <p className="col-span-2 text-secondary">Contact Info</p>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="col-span-2 flex flex-row gap-12">
            {/* Applicant res phone Controller */}
            <Controller
              name="resTelephone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  required
                  disabled
                  label="Residential Telephone"
                  size="small"
                  type="text"
                  // className="pr-10"
                  helperText={<>{errors.resTelephone?.message}</>}
                  error={!!errors.resTelephone}
                />
              )}
            />

            {/* Applicant mobile Controller */}
            <Controller
              name="mobTelephone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  required
                  disabled
                  label="Mobile Telephone"
                  size="small"
                  type="text"
                  // className="pr-10"
                  helperText={<>{errors.mobTelephone?.message}</>}
                  error={!!errors.mobTelephone}
                />
              )}
            />

            {/* Applicant office phone Controller */}
            <Controller
              name="officeTelephone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  //   disabled={!editable}
                  required
                  disabled
                  label="Office Telephone"
                  size="small"
                  type="text"
                  // className="pr-10"
                  helperText={<>{errors.officeTelephone?.message}</>}
                  error={!!errors.officeTelephone}
                />
              )}
            />
          </div>

          <div className="col-span-2 flex flex-row items-center gap-3">
            <p className="col-span-2 text-secondary">Other</p>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* DOB Controller */}
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // disabled={!editable}
                  disabled
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Date of Birth"
                  onChange={(newValue) => {
                    const dateOnly = newValue
                      ? dayjs(newValue).endOf("day").toDate()
                      : null;
                    onChange(dateOnly);

                    //   const age = calculateAge(newValue);
                    //   setValue("applicantAge", age);
                  }}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: !!errors.dateOfBirth,
                      helperText: <>{errors?.dateOfBirth?.message}</>,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="CustomerCategory"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={customerCategoryDropdown || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Customer Category"
                    variant="outlined"
                    // required={isCC}
                    size="small"
                    helperText={<>{errors.CustomerCategory?.message}</>}
                    error={!!errors.CustomerCategory}
                  />
                )}
              />
            )}
          />

          <Controller
            name="industry"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={industryDropdown || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Industry"
                    variant="outlined"
                    required
                    // required={isCC}
                    size="small"
                    helperText={<>{errors.industry?.message}</>}
                    error={!!errors.industry}
                  />
                )}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={cityDropdown || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    variant="outlined"
                    // required={isCC}
                    size="small"
                    helperText={<>{errors.city?.message}</>}
                    error={!!errors.city}
                  />
                )}
              />
            )}
          />

          <Controller
            name="companyStatus"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={companyTypeDropdown || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Company Status"
                    variant="outlined"
                    // required={isCC}
                    size="small"
                    helperText={<>{errors.companyStatus?.message}</>}
                    error={!!errors.companyStatus}
                  />
                )}
              />
            )}
          />

          {/* Applicant NIC Controller */}
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Salary"
                size="small"
                type="text"
                required
                // className="pr-10"
                helperText={<>{errors.salary?.message}</>}
                error={!!errors.salary}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          {/* Applicant NIC Controller */}
          <Controller
            name="disbursalAccount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Disbursal Account"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.disbursalAccount?.message}</>}
                error={!!errors.disbursalAccount}
                // onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                // InputProps={{
                //   inputProps: { style: { textAlign: "right" } },
                // }}
              />
            )}
          />

          <div className="col-span-2 flex flex-row items-center gap-3">
            <p className="col-span-2 text-secondary">Employment Details</p>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* <Controller
            name="company"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                // disabled={!editable || !isCC}
                options={options || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled
                    label="Company"
                    variant="outlined"
                    // required={isCC}
                    size="small"
                    helperText={<>{errors.creditCardType?.message}</>}
                    error={!!errors.creditCardType}
                  />
                )}
              />
            )}
          /> */}
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                required
                // disabled
                label="Company"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.company?.message}</>}
                error={!!errors.company}
              />
            )}
          />

          <Controller
            name="profession"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={professionTypeDropdown || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Profession"
                    variant="outlined"
                    required
                    size="small"
                    helperText={<>{errors.profession?.message}</>}
                    error={!!errors.profession}
                  />
                )}
              />
            )}
          />

          {/* <div /> */}

          {/* Applicant NIC Controller */}
          <Controller
            name="officeAddress1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                disabled
                label="Office Address 1"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.officeAddress1?.message}</>}
                error={!!errors.officeAddress1}
              />
            )}
          />
          {/* Applicant NIC Controller */}
          <Controller
            name="officeAddress2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                disabled
                label="Office Address 2"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.officeAddress2?.message}</>}
                error={!!errors.officeAddress2}
              />
            )}
          />
          {/* Applicant NIC Controller */}
          <Controller
            name="officeAddress3"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                disabled
                label="Office Address 3"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.officeAddress3?.message}</>}
                error={!!errors.officeAddress3}
              />
            )}
          />
          {/* Applicant NIC Controller */}
          <Controller
            name="officeZipCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                //   disabled={!editable}
                disabled
                label="Office Zip Code"
                size="small"
                type="text"
                // className="pr-10"
                helperText={<>{errors.officeZipCode?.message}</>}
                error={!!errors.officeZipCode}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EyeballingFinalForm;
