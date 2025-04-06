import { Autocomplete, Paper, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { DropDownItem } from "../../../../../core/types/DropDown";
import { formatCurrency } from "../../../../../workflow/bundle/@helpers/Common";

interface TermLoanFacilityProps {
  editable: boolean;
  repaymentTypeDropdowns: DropDownItem[];
  currencyDropdowns: DropDownItem[];
}

const TermLoanFacility: React.FC<TermLoanFacilityProps> = ({
  editable,
  repaymentTypeDropdowns,
  currencyDropdowns,
}) => {
  const { control, watch, formState } = useFormContext();
  const { errors } = formState;

  const tlFacilityRepayPeriod = watch("tlFacilityRepayPeriod");
  const applicationType = watch("applicationType");

  // applicationTypeChecker
  const isOverdraftApplication = () => {
    if (applicationType?.id.toString() === "OVER_DRAFT") {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="heroicons-outline:office-building"
          title="Term Loan Facility"
        />
        <div className="flex flex-col gap-14">
          <div className="border-b border-b-gray-300 pb-14">
            <div className="flex flex-row gap-14 ">
              {/* arm code Controller */}
              <Controller
                name="tlFacilityAccount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required={!isOverdraftApplication()}
                    disabled={!editable}
                    label="Facility Account"
                    size="small"
                    type="text"
                    className="basis-1/2"
                    // className="pr-10"
                    // required
                    helperText={<>{errors.tlFacilityAccount?.message}</>}
                    error={!!errors.tlFacilityAccount}
                  />
                )}
              />

              {/* facility currency */}
              <Controller
                name="tlFacilityCurrency"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={currencyDropdowns}
                    className="basis-1/2"
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
                        required={!isOverdraftApplication()}
                        label="Currency"
                        variant="outlined"
                        // required
                        size="small"
                        helperText={<>{errors.tlFacilityCurrency?.message}</>}
                        error={!!errors.tlFacilityCurrency}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-14 border-b border-b-gray-300 pb-14">
            <p className="mx-auto">
              <Controller
                name="tlFacilityInterestRate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Rate of Interest"
                    size="small"
                    type="text"
                    sx={{
                      width: "120px",
                      marginRight: "10px",
                      height: "14px",
                      bottom: "15px",
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        field.onChange(value);
                      }
                    }}
                    helperText={<>{errors.tlFacilityInterestRate?.message}</>}
                    error={!!errors.tlFacilityInterestRate}
                    // className="pr-10"
                    // required
                  />
                )}
              />
              % per annum (fixed for five year) for the approved facility
              amount. The rate is variable at the discretion of the bank,
              calculated on a daily basis on the outstanding balance and payable
              monthly together with any other applicable charges.
            </p>
          </div>

          <div className=" flex flex-col gap-14 border-b border-b-gray-300 pb-14">
            <div className="flex flex-row gap-14">
              <Controller
                name="tlFacilityRepayPeriod"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={repaymentTypeDropdowns}
                    className="basis-1/3"
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
                        label="Repayment Period"
                        variant="outlined"
                        // required
                        size="small"
                        helperText={
                          <>{errors.tlFacilityRepayPeriod?.message}</>
                        }
                        error={!!errors.tlFacilityRepayPeriod}
                      />
                    )}
                  />
                )}
              />
              {tlFacilityRepayPeriod && tlFacilityRepayPeriod.id == "OTHER" ? (
                <Controller
                  name="tlFacilityRepayPeriodOther"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={!editable}
                      label="Other (Specify in months)"
                      size="small"
                      type="text"
                      className="basis-1/3"
                      helperText={
                        <>{errors.tlFacilityRepayPeriodOther?.message}</>
                      }
                      error={!!errors.tlFacilityRepayPeriodOther}
                      // className="pr-10"
                      // required
                    />
                  )}
                />
              ) : (
                <div className="basis-1/3"></div>
              )}
              <div className="basis-1/3"></div>
            </div>
          </div>

          <div className="border-b border-b-gray-300 pb-14">
            <div className="flex flex-row gap-14">
              {/* arm code Controller */}
              <Controller
                name="tlFacilityRepayAccount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    required={!isOverdraftApplication()}
                    label="Repayment Account"
                    size="small"
                    type="text"
                    className="basis-1/3"
                    helperText={<>{errors.tlFacilityRepayAccount?.message}</>}
                    error={!!errors.tlFacilityRepayAccount}
                    // className="pr-10"
                    // required
                  />
                )}
              />

              {/* facility repay currency controller */}
              <Controller
                name="tlFacilityRepayCurrency"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={currencyDropdowns}
                    className="basis-1/3"
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
                        label="Repayment Currency"
                        required={!isOverdraftApplication()}
                        variant="outlined"
                        // required
                        size="small"
                        helperText={
                          <>{errors.tlFacilityRepayCurrency?.message}</>
                        }
                        error={!!errors.tlFacilityRepayCurrency}
                      />
                    )}
                  />
                )}
              />
              <div className="basis-1/3"></div>
            </div>
          </div>
          <div className=" flex flex-col gap-14 border-b border-b-gray-300 pb-14">
            <div className="flex flex-row gap-14">
              {/* arm code Controller */}
              <Controller
                name="tlFacilityRequiredAmountFigs"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Facility Amount Required (in figures)"
                    size="small"
                    type="text"
                    onChange={(e) =>
                      field.onChange(formatCurrency(e.target.value))
                    }
                    InputProps={{
                      inputProps: { style: { textAlign: "right" } },
                    }}
                    helperText={
                      <>{errors.tlFacilityRequiredAmountFigs?.message}</>
                    }
                    error={!!errors.tlFacilityRequiredAmountFigs}
                    // className="pr-10"
                    // required
                  />
                )}
              />
              {/* arm code Controller */}
              <Controller
                name="tlFacilityRequiredAmountWords"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Facility Amount Required (in words)"
                    size="small"
                    type="text"
                    helperText={
                      <>{errors.tlFacilityRequiredAmountWords?.message}</>
                    }
                    error={!!errors.tlFacilityRequiredAmountWords}
                    // className="pr-10"
                    // required
                  />
                )}
              />
            </div>
            <p className="text-[12px]">
              * the facility amount approved may differ from the amount applied
              for, based on the internal credit evaluation criteria
            </p>
          </div>
          <div className="border-b border-b-gray-300 pb-14">
            <div className="flex flex-row gap-14 ">
              {/* arm code Controller */}
              <Controller
                name="tlFacilityCreditAccount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    required={!isOverdraftApplication()}
                    label="Facility Crediting account"
                    size="small"
                    type="text"
                    helperText={<>{errors.tlFacilityCreditAccount?.message}</>}
                    error={!!errors.tlFacilityCreditAccount}
                    // className="pr-10"
                    // required
                  />
                )}
              />

              <Controller
                name="tlFacilityCreditingCurrency"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={currencyDropdowns}
                    className=""
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
                        required={!isOverdraftApplication()}
                        label="Currency"
                        variant="outlined"
                        // required
                        size="small"
                        helperText={
                          <>{errors.tlFacilityCreditingCurrency?.message}</>
                        }
                        error={!!errors.tlFacilityCreditingCurrency}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="tlFacilityExpDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      minDate={dayjs()}
                      disabled={!editable}
                      views={["day", "month", "year"]}
                      format="DD-MM-YYYY"
                      value={value ? dayjs(value) : null}
                      label="Facility Expiry Date"
                      onChange={(newValue) => {
                        const dateOnly = newValue
                          ? dayjs(newValue).endOf("day").toDate()
                          : null;
                        onChange(dateOnly);
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          error: !!errors.tlFacilityExpDate,
                          helperText: <>{errors?.tlFacilityExpDate?.message}</>,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
          {/* arm code Controller */}
          <Controller
            name="tlFacilityPurpose"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Purpose of the facility"
                size="small"
                type="text"
                className=""
                helperText={<>{errors.tlFacilityPurpose?.message}</>}
                error={!!errors.tlFacilityPurpose}
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

export default TermLoanFacility;
