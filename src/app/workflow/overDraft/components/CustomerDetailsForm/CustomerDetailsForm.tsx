import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../core/types/DropDown";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { formatCurrency } from "../../../bundle/@helpers/Common";

interface CustomerDetailsFormProps {
  editable: boolean;
  onClickUpdate: () => void;
  titleDropdowns: DropDownItem[];
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  editable,
  onClickUpdate,
  titleDropdowns,
}) => {
  const methods = useFormContext();
  const { control, formState, setValue } = methods;
  const { errors } = formState;

  // useEffect(() => {
  //   setValue("currentStep", 0);
  // }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-14">
        {/* Left */}
        <div className="h-full">
          <Paper className="px-12 pb-10 h-full">
            <Ve3FormHeader icon="feather:user" title="Personal Information" />

            <div className="flex flex-col gap-9">
              {/* title and name */}
              <div className="flex flex-row gap-9 w-full">
                {/* title controller */}
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={titleDropdowns}
                      disabled={!editable}
                      className="basis-1/5"
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
                          required
                          size="small"
                          helperText={<>{errors.title?.message}</>}
                          error={!!errors.title}
                        />
                      )}
                    />
                  )}
                />

                {/* name controller */}
                <Controller
                  name="customerName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      required
                      label="Name"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerName?.message}</>}
                      error={!!errors.customerName}
                    />
                  )}
                />
              </div>

              {/* occupation and nic */}
              <div className="flex flex-row gap-9 w-full">
                {/* occupation controller */}
                <Controller
                  name="customerOccupation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Occupation / Profession"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerOccupation?.message}</>}
                      error={!!errors.customerOccupation}
                    />
                  )}
                />

                {/* nic pp controller */}
                {/* passport controller */}
                <Controller
                  name="customerNicPP"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      disabled={!editable}
                      label="NIC / Passport Number"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerNicPP?.message}</>}
                      error={!!errors.customerNicPP}
                    />
                  )}
                />
              </div>

              {/* dob and occupation */}
              <div className="flex flex-row gap-9 w-full">
                {/* DOB Controller */}
                <Controller
                  name="customerDob"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // className="basis-1/2 pr-10"
                        maxDate={dayjs()}
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
                            required: true,
                            size: "small",
                            error: !!errors.customerDob,
                            helperText: <>{errors?.customerDob?.message}</>,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />

                {/* occupation controller */}
                <Controller
                  name="customerNationality"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Current Nationality"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerNationality?.message}</>}
                      error={!!errors.customerNationality}
                    />
                  )}
                />
              </div>

              {/* Resident information */}
              <div className="flex flex-row gap-9 w-full">
                {/* resident info controller */}
                <Controller
                  name="residentStatus"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-1/2 pr-4"
                      disabled={!editable}
                      label="Resident Status"
                      size="small"
                      type="text"
                      helperText={<>{errors.residentStatus?.message}</>}
                      error={!!errors.residentStatus}
                    />
                  )}
                />
              </div>
            </div>
          </Paper>
        </div>

        {/* Right */}
        <div>
          <Paper className="px-12 pb-10 h-full">
            <Ve3FormHeader
              icon="feather:phone"
              title="Contact & Financial Details"
            />
            <div className="w-full flex flex-col gap-9">
              {/* email controller */}
              <Controller
                name="customerEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Email"
                    className="ms-auto w-1/2 pl-4"
                    size="small"
                    type="text"
                    helperText={<>{errors.customerEmail?.message}</>}
                    error={!!errors.customerEmail}
                  />
                )}
              />

              {/* mobile and res tel */}
              <div className="flex flex-row gap-9 w-full">
                {/* occupation controller */}
                <Controller
                  name="customerMobile"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      required
                      label="Mobile"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerMobile?.message}</>}
                      error={!!errors.customerMobile}
                    />
                  )}
                />

                {/* nic pp controller */}
                {/* passport controller */}
                <Controller
                  name="customerResTel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Tel. No (Residence)"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerResTel?.message}</>}
                      error={!!errors.customerResTel}
                    />
                  )}
                />
              </div>

              {/* res address line 1*/}
              <div className="flex flex-row gap-9 w-full">
                {/* add3 controller */}
                <Controller
                  name="customerResAdd1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Residence Address 1"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerResAdd1?.message}</>}
                      error={!!errors.customerResAdd1}
                    />
                  )}
                />
              </div>

              {/* income and master num*/}
              <div className="flex flex-row gap-9 w-full">
                {/* income controller */}
                <Controller
                  name="customerResAdd2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Residence Address 2"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerResAdd2?.message}</>}
                      error={!!errors.customerResAdd2}
                    />
                  )}
                />

                {/* master num controller */}
                <Controller
                  name="customerResAdd3"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Residence Address 3"
                      size="small"
                      type="text"
                      helperText={<>{errors.customerResAdd3?.message}</>}
                      error={!!errors.customerResAdd3}
                    />
                  )}
                />
              </div>

              {/* master num and income*/}
              <div className="flex flex-row gap-9 w-full">
                {/* income controller */}
                <Controller
                  name="customerFixedIncome"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Monthly Fixed Income"
                      size="small"
                      type="text"
                      onChange={(e) =>
                        field.onChange(formatCurrency(e.target.value))
                      }
                      InputProps={{
                        inputProps: { style: { textAlign: "right" } },
                      }}
                      helperText={<>{errors.customerFixedIncome?.message}</>}
                      error={!!errors.customerFixedIncome}
                    />
                  )}
                />

                {/* master num controller */}
                <Controller
                  name="masterNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Master Number"
                      size="small"
                      type="text"
                      helperText={<>{errors.masterNumber?.message}</>}
                      error={!!errors.masterNumber}
                    />
                  )}
                />
              </div>
            </div>
          </Paper>
        </div>
      </div>
      {editable && (
        <div className="flex items-end justify-end my-9">
          <Button
            type="submit"
            className="flex flex-row gap-3"
            disabled={!editable}
          >
            <EdgeSvgIcon>feather:refresh-ccw</EdgeSvgIcon>
            Update
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsForm;
