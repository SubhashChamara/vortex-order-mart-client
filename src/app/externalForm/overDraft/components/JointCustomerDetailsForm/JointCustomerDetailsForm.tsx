import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../core/types/DropDown";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

interface JointCustomerDetailsFormProps {
  editable: boolean;
  onClickUpdate: () => void;
  titleDropdowns: DropDownItem[];
}

const JointCustomerDetailsForm: React.FC<JointCustomerDetailsFormProps> = ({
  editable,
  onClickUpdate,
  titleDropdowns,
}) => {
  const methods = useFormContext();
  const { control, setValue, formState } = methods;
  const { errors } = formState;

  useEffect(() => {
    setValue("currentStep", 1);
  }, []);

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
                  name="JointCustomerTitle"
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
                          helperText={<>{errors.JointCustomerTitle?.message}</>}
                          error={!!errors.JointCustomerTitle}
                        />
                      )}
                    />
                  )}
                />

                {/* name controller */}
                <Controller
                  name="jointCustomerName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      disabled={!editable}
                      label="Name"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointCustomerName?.message}</>}
                      error={!!errors.jointCustomerName}
                    />
                  )}
                />
              </div>

              {/* occupation and nic */}
              <div className="flex flex-row gap-9 w-full">
                {/* occupation controller */}
                <Controller
                  name="jointCustomerOccupation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Occupation / Profession"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.jointCustomerOccupation?.message}</>
                      }
                      error={!!errors.jointCustomerOccupation}
                    />
                  )}
                />

                {/* nic pp controller */}
                {/* passport controller */}
                <Controller
                  name="jointCustomerNicPP"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      disabled={!editable}
                      label="NIC / Passport Number"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointCustomerNicPP?.message}</>}
                      error={!!errors.jointCustomerNicPP}
                    />
                  )}
                />
              </div>

              {/* dob and occupation */}
              <div className="flex flex-row gap-9 w-full">
                {/* DOB Controller */}
                <Controller
                  name="jointCustomerDob"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // className="basis-1/2 pr-10"
                        disabled={!editable}
                        maxDate={dayjs()}
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
                            error: !!errors.jointCustomerDob,
                            helperText: (
                              <>{errors?.jointCustomerDob?.message}</>
                            ),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />

                {/* occupation controller */}
                <Controller
                  name="jointCustomerNationality"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Current Nationality"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.jointCustomerNationality?.message}</>
                      }
                      error={!!errors.jointCustomerNationality}
                    />
                  )}
                />
              </div>

              {/* Resident information */}
              <div className="flex flex-row gap-9 w-full">
                {/* resident info controller */}
                <Controller
                  name="jointResidentStatus"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="w-1/2 pr-4"
                      disabled={!editable}
                      label="Resident Status"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointResidentStatus?.message}</>}
                      error={!!errors.jointResidentStatus}
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
                name="jointCustomerEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    disabled={!editable}
                    label="Email"
                    className="ms-auto w-1/2 pl-4"
                    size="small"
                    type="text"
                    helperText={<>{errors.jointCustomerEmail?.message}</>}
                    error={!!errors.jointCustomerEmail}
                  />
                )}
              />

              {/* mobile and res tel */}
              <div className="flex flex-row gap-9 w-full">
                {/* occupation controller */}
                <Controller
                  name="jointCustomerMobile"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      disabled={!editable}
                      label="Mobile"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointCustomerMobile?.message}</>}
                      error={!!errors.jointCustomerMobile}
                    />
                  )}
                />

                {/* nic pp controller */}
                {/* passport controller */}
                <Controller
                  name="jointCustomerResTel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Tel. No (Residence)"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointCustomerResTel?.message}</>}
                      error={!!errors.jointCustomerResTel}
                    />
                  )}
                />
              </div>

              {/* res address line 1*/}
              <div className="flex flex-row gap-9 w-full">
                {/* add3 controller */}
                <Controller
                  name="jointCustomerResAdd1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Residence Address 1"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointCustomerResAdd1?.message}</>}
                      error={!!errors.jointCustomerResAdd1}
                    />
                  )}
                />
              </div>

              {/* income and master num*/}
              <div className="flex flex-row gap-9 w-full">
                {/* income controller */}
                <Controller
                  name="jointCustomerResAdd2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Residence Address 2"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointCustomerResAdd2?.message}</>}
                      error={!!errors.jointCustomerResAdd2}
                    />
                  )}
                />

                {/* master num controller */}
                <Controller
                  name="jointCustomerResAdd3"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Residence Address 3"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointCustomerResAdd3?.message}</>}
                      error={!!errors.jointCustomerResAdd3}
                    />
                  )}
                />
              </div>

              {/* master num and income*/}
              <div className="flex flex-row gap-9 w-full">
                {/* income controller */}
                <Controller
                  name="jointCustomerFixedIncome"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Monthly Fixed Income"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.jointCustomerFixedIncome?.message}</>
                      }
                      error={!!errors.jointCustomerFixedIncome}
                    />
                  )}
                />

                {/* master num controller */}
                <Controller
                  name="jointMasterNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Master Number"
                      size="small"
                      type="text"
                      helperText={<>{errors.jointMasterNumber?.message}</>}
                      error={!!errors.jointMasterNumber}
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

export default JointCustomerDetailsForm;
