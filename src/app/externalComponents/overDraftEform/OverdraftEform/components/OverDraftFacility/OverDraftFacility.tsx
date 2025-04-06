import {
  Autocomplete,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../../core/types/DropDown";
import { formatCurrency } from "../../../../../workflow/bundle/@helpers/Common";

interface OverDraftFacilityProps {
  editable: boolean;
  currencyDropdowns: DropDownItem[];
}

const OverDraftFacility: React.FC<OverDraftFacilityProps> = ({
  editable,
  currencyDropdowns,
}) => {
  const { control, watch, formState } = useFormContext();
  const { errors } = formState;

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
          title="Overdraft Facility"
        />
        <div className="flex flex-col gap-14">
          <div className="pb-14 border-b border-b-gray-300">
            <Controller
              name="isRenewAnnually"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="flex justify-between items-center w-full flex-row"
                >
                  <p className="font-bold">Renew annually:</p>
                  <div className="flex items-center gap-4 w-full justify-start">
                    <FormControlLabel
                      disabled={!editable}
                      value={true}
                      control={<Radio />}
                      label="Yes, please renew at the prevailing rate applicable"
                      className="text-gray-700"
                    />
                    <FormControlLabel
                      disabled={!editable}
                      value={false}
                      control={<Radio />}
                      label="No, Don't renew"
                      className="text-gray-700"
                    />
                  </div>
                </RadioGroup>
              )}
            />
          </div>
          <div className="border-b border-b-gray-300 pb-14">
            <div className="flex flex-row gap-14 ">
              {/* arm code Controller */}
              <Controller
                name="odFacilityAccount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    required={isOverdraftApplication()}
                    label="Facility Account"
                    size="small"
                    type="text"
                    inputProps={{
                      maxLength: 11, // Limit to 11 characters
                      inputMode: "numeric", // Suggests a numeric keyboard on mobile devices
                      pattern: "[0-9]*", // Only allows numeric input
                    }}
                    onInput={(e) => {
                      // Ensure only numbers are entered
                      const input = e.target as HTMLInputElement; // Type assertion
                      input.value = input.value.replace(/[^0-9]/g, "");
                    }}
                    helperText={<>{errors.odFacilityAccount?.message}</>}
                    error={!!errors.odFacilityAccount}
                    // className="pr-10"
                    // required
                  />
                )}
              />

              <Controller
                name="odFacilityCurrency"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={currencyDropdowns}
                    disabled={!editable}
                    className=""
                    getOptionLabel={(option) => (option ? option.name : "")}
                    isOptionEqualToValue={(option, val) => option.id === val.id}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required={isOverdraftApplication()}
                        label="Currency"
                        variant="outlined"
                        // required
                        size="small"
                        helperText={<>{errors.odFacilityCurrency?.message}</>}
                        error={!!errors.odFacilityCurrency}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="odFacilityExpDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disabled={!editable}
                      minDate={dayjs()}
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
                          error: !!errors.odFacilityExpDate,
                          helperText: <>{errors?.odFacilityExpDate?.message}</>,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-14 border-b border-b-gray-300 pb-14">
            <p>
              <Controller
                name="odFacilityInterestRate"
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
                  />
                )}
              />
              % per annum for the approved facility amount. The rate is
              calculated on a daily basis on the outstanding balance and payable
              monthly together with any other applicable charges.
            </p>
            <p>
              <Controller
                name="odFacilityExcessRate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Excess Rate"
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
                      // Allow only numbers and a single decimal point
                      if (/^\d*\.?\d*$/.test(value)) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
              />{" "}
              % will apply( Excess rate is applicable only for Overdrafts)
            </p>

            <div className="flex flex-row gap-14">
              {/* arm code Controller */}
              <Controller
                name="odFacilityRequiredAmountFigs"
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
                    error={!!errors.odFacilityRequiredAmountFigs}
                    helperText={
                      <>{errors?.odFacilityRequiredAmountFigs?.message}</>
                    }
                    // className="pr-10"
                    // required
                  />
                )}
              />
              {/* arm code Controller */}
              <Controller
                name="odFacilityRequiredAmountWords"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Facility Amount Required (in words)"
                    size="small"
                    type="text"
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
          {/* arm code Controller */}
          <Controller
            name="odFacilityPurpose"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!editable}
                label="Purpose of the facility"
                size="small"
                type="text"
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

export default OverDraftFacility;
