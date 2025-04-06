import { Autocomplete, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { formatCurrency } from "../../../../workflow/bundle/@helpers/Common";

interface LoanApplicationInformationProps {
  editable: boolean;
  loanTypeDropdowns: DropDownItem[];
}
const LoanApplicationInformation: React.FC<LoanApplicationInformationProps> = ({
  editable,
  loanTypeDropdowns,
}) => {
  const { control, formState, setValue, watch } = useFormContext();
  const { errors } = formState;

  const loanApplicationInterestRate = watch("loanApplicationInterestRate");

  console.log(loanApplicationInterestRate);

  return (
    <div className="h-full">
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:file"
          title="Loan & Application Information"
        />
        <div className="grid grid-cols-3 gap-12 text-gray-600">
          <div className="col-span-3 flex flex-row gap-3 items-center w-full">
            <p className="text-nowrap">Application Metadata</p>
            <hr className="border-t border-gray-400 w-full" />
          </div>

          <Controller
            name="loanApplicationCount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
                label="Application Count"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicationCount?.message}</>}
                error={!!errors.loanApplicationCount}
              />
            )}
          />

          {/* <Controller
            name="loanApplicationDate"
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
          /> */}
          {/* Application date time Controller */}
          <Controller
            name="loanApplicationDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disabled={!editable}
                  views={["day", "month", "year", "hours", "minutes"]}
                  format="DD-MM-YYYY HH:mm"
                  value={value ? dayjs(value) : null}
                  label="Application Date & Time"
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    const localDateTime = newValue
                      ? dayjs(newValue).format("YYYY-MM-DDTHH:mm:ss")
                      : null;
                    onChange(localDateTime);
                    setValue(
                      "loanApplicationMonth",
                      dayjs(localDateTime).format("MMMM")
                    );
                  }}
                  ampm={false}
                  slotProps={{
                    textField: {
                      size: "small",
                      required: true,
                      error: !!errors.loanApplicationDate,
                      helperText: <>{errors?.loanApplicationDate?.message}</>,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="loanApplicationMonth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
                label="Application Month"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicationMonth?.message}</>}
                error={!!errors.loanApplicationMonth}
              />
            )}
          />

          {/* <Controller
            name="loanApplicationReceivedDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // disabled={!editable}
                  minDate={dayjs()}
                  views={["day", "month", "year"]}
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value) : null}
                  label="Received Date"
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
                      helperText: (
                        <>{errors?.loanApplicationReceivedDate?.message}</>
                      ),
                      error: !!errors.loanApplicationReceivedDate,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          /> */}

          <Controller
            name="loanApplicationReceivedDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  disabled
                  views={["day", "month", "year", "hours", "minutes"]}
                  format="DD-MM-YYYY HH:mm"
                  value={value ? dayjs(value) : null}
                  label="Received Date & Time"
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
                      // required: true,
                      error: !!errors.loanApplicationReceivedDate,
                      helperText: (
                        <>{errors?.loanApplicationReceivedDate?.message}</>
                      ),
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          {/* <Controller
            name="loanApplicationTime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Received Time"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicationTime?.message}</>}
                error={!!errors.loanApplicationTime}
              />
            )}
          /> */}

          <Controller
            name="loanApplicationPWIDSC"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="PWID/Source Code"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicationPWIDSC?.message}</>}
                error={!!errors.loanApplicationPWIDSC}
              />
            )}
          />

          <div className="col-span-3 flex flex-row gap-3 items-center w-full">
            <p className="text-nowrap">Loan Details</p>
            <hr className="border-t border-gray-400 w-full" />
          </div>

          <Controller
            name="loanApplicationType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                disabled={!editable}
                options={loanTypeDropdowns || []}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Loan Type"
                    variant="outlined"
                    required
                    size="small"
                    helperText={<>{errors.loanApplicationType?.message}</>}
                    error={!!errors.loanApplicationType}
                  />
                )}
              />
            )}
          />

          <Controller
            name="loanApplicationTotalValue"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Total Loan Value"
                size="small"
                type="text"
                className="basis-2/3"
                required
                helperText={<>{errors.loanApplicationTotalValue?.message}</>}
                error={!!errors.loanApplicationTotalValue}
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
              />
            )}
          />

          <Controller
            name="loanApplicationInterestRate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Interest Rate"
                size="small"
                type="text"
                className="basis-2/3"
                inputProps={{
                  inputProps: { style: { textAlign: "right" } },
                  inputMode: "decimal",
                  pattern: "[0-9]*\\.?[0-9]*",
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    field.onChange(value);
                  }
                }}
                helperText={<>{errors.loanApplicationInterestRate?.message}</>}
                error={!!errors.loanApplicationInterestRate}
              />
            )}
          />

          <Controller
            name="loanApplicationTenor"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                required
                label="Tenor"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicationTenor?.message}</>}
                error={!!errors.loanApplicationTenor}
              />
            )}
          />

          <Controller
            name="loanApplicationMasterNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Master No"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicationMasterNo?.message}</>}
                error={!!errors.loanApplicationMasterNo}
              />
            )}
          />

          <Controller
            name="loanApplicationRepaymentMode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Loan Repayment Mode"
                size="small"
                type="text"
                className="basis-2/3"
                helperText={<>{errors.loanApplicationRepaymentMode?.message}</>}
                error={!!errors.loanApplicationRepaymentMode}
              />
            )}
          />

          <div className="col-span-3 flex flex-row gap-3 items-center w-full">
            <p className="text-nowrap">Financial Information</p>
            <hr className="border-t border-gray-400 w-full" />
          </div>

          <Controller
            name="loanApplicationGrossIncome"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Gross Income"
                size="small"
                type="text"
                className="basis-2/3"
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                helperText={<>{errors.loanApplicationGrossIncome?.message}</>}
                error={!!errors.loanApplicationGrossIncome}
              />
            )}
          />
          <Controller
            name="loanApplicationNetIncome"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Net Income"
                size="small"
                type="text"
                className="basis-2/3"
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                helperText={<>{errors.loanApplicationNetIncome?.message}</>}
                error={!!errors.loanApplicationNetIncome}
              />
            )}
          />
          <Controller
            name="loanApplicationDBR"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="DBR"
                size="small"
                type="text"
                className="basis-2/3"
                onChange={(e) => field.onChange(formatCurrency(e.target.value))}
                InputProps={{
                  inputProps: { style: { textAlign: "right" } },
                }}
                helperText={<>{errors.loanApplicationDBR?.message}</>}
                error={!!errors.loanApplicationDBR}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default LoanApplicationInformation;
