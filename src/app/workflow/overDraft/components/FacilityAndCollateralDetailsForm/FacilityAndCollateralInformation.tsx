import {
  Autocomplete,
  Button,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

interface FacilityAndCollateralInformationProps {
  editable: boolean;
  facilityType?: string;
  onClickUpdate: () => void;
  branchDropdowns: DropDownItem[];
  repaymentTypeDropdowns: DropDownItem[];
  currencyDropdowns: DropDownItem[];
}

const FacilityAndCollateralInformation: React.FC<
  FacilityAndCollateralInformationProps
> = ({
  editable,
  facilityType,
  onClickUpdate,
  branchDropdowns,
  currencyDropdowns,
  repaymentTypeDropdowns,
}) => {
  const methods = useFormContext();
  const { control, watch, formState, setValue } = methods;
  const { errors } = formState;

  const tlRepaymentPeriod = watch("tlRepaymentPeriod");

  const isEditable = (odOrTl: string) => {
    if (editable && odOrTl === facilityType) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setValue("currentStep", 2);
  }, []);

  return (
    <div className="flex flex-col gap-9">
      {/* top */}
      <div className="flex flex-col gap-9">
        <Paper className="px-12 pb-10 h-full">
          <Ve3FormHeader
            icon="heroicons-outline:office-building"
            title="Facility Information"
          />

          <div className="flex flex-row gap-9">
            {/* dob and occupation */}
            <div className="flex flex-col gap-9 w-full border-r border-r-grey-300 pr-9">
              {/* date Controller */}
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // className="basis-1/2 pr-10"
                      minDate={dayjs()}
                      disabled={!editable}
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
                          error: !!errors.date,
                          helperText: <>{errors?.date?.message}</>,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />

              {/* occupation controller */}
              <Controller
                name="customerMaster"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Customer Master"
                    size="small"
                    type="text"
                    helperText={<>{errors.customerMaster?.message}</>}
                    error={!!errors.customerMaster}
                  />
                )}
              />
            </div>

            {/* dob and occupation */}
            <div className="flex flex-col gap-9 w-full border-r border-r-grey-300 pr-9">
              <Controller
                name="branch"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={branchDropdowns}
                    className=""
                    disabled
                    getOptionLabel={(option: DropDownItem) =>
                      option ? option.name.toUpperCase() : ""
                    }
                    isOptionEqualToValue={(option, val) => option.id === val.id}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Branch"
                        variant="outlined"
                        // required
                        size="small"
                        helperText={<>{errors.branch?.message}</>}
                        error={!!errors.branch}
                      />
                    )}
                  />
                )}
              />

              {/* occupation controller */}
              <Controller
                name="branchCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    disabled={true}
                    label="Branch Code"
                    size="small"
                    type="text"
                    helperText={<>{errors.branchCode?.message}</>}
                    error={!!errors.branchCode}
                  />
                )}
              />
            </div>

            {/* dob and occupation */}
            <div className="flex flex-col gap-9 w-full">
              {/* occupation controller */}
              <Controller
                name="armCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="ARM Code"
                    size="small"
                    type="text"
                    helperText={<>{errors.armCode?.message}</>}
                    error={!!errors.armCode}
                  />
                )}
              />

              {/* occupation controller */}
              <Controller
                name="segmentCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!editable}
                    label="Segment Code"
                    size="small"
                    type="text"
                    helperText={<>{errors.segmentCode?.message}</>}
                    error={!!errors.segmentCode}
                  />
                )}
              />
            </div>
          </div>
        </Paper>
      </div>

      {/* bottom - loan details */}
      <div className="grid grid-cols-1 gap-14">
        {/* bottom left */}
        <div>
          <Paper className="px-12 pb-10 h-full">
            <Ve3FormHeader
              icon="heroicons-outline:cash"
              title="Over Draft Facility"
            />

            <div className="flex flex-col gap-9">
              {/* renew annually and facility acc */}
              <div className="flex flex-row gap-9">
                {/* renew anually controller */}
                <div className="w-full flex flex-row justify-between items-center gap-9">
                  <p>Renew Anually: </p>
                  <Controller
                    name="renewAnnually"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <ToggleButtonGroup
                        color="error"
                        // className="-mr-7"
                        value={field.value === true ? "true" : "false"} // Use strings to match ToggleButton values
                        exclusive
                        onChange={(event, newAlignment) => {
                          // Only update if the new value is valid
                          if (newAlignment !== null) {
                            field.onChange(newAlignment === "true"); // Update the form state with the selected value
                          }
                        }}
                        aria-label="Email Advice"
                      >
                        <ToggleButton
                          disabled={!isEditable("OVER_DRAFT")}
                          value="true"
                          className="min-w-32 h-24"
                        >
                          Yes
                        </ToggleButton>
                        <ToggleButton
                          disabled={!isEditable("OVER_DRAFT")}
                          value="false"
                          className="min-w-32 h-24"
                        >
                          No
                        </ToggleButton>
                      </ToggleButtonGroup>
                    )}
                  />
                </div>

                {/* facility account controller */}
                <Controller
                  name="odFacilityAccount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      required
                      disabled={!isEditable("OVER_DRAFT")}
                      label="Facility Account"
                      size="small"
                      type="text"
                      helperText={<>{errors.odFacilityAccount?.message}</>}
                      error={!!errors.odFacilityAccount}
                    />
                  )}
                />
              </div>

              {/* currency & facility expiry date */}
              <div className="flex flex-row gap-9">
                {/* currency controller */}

                <Controller
                  name="odCurrency"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={currencyDropdowns}
                      disabled={!isEditable("OVER_DRAFT")}
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
                          label="Currency"
                          variant="outlined"
                          // required
                          size="small"
                          helperText={<>{errors.odCurrency?.message}</>}
                          error={!!errors.odCurrency}
                        />
                      )}
                    />
                  )}
                />
                {/* date Controller */}
                <Controller
                  name="odFacilityExpDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // className="basis-1/2 pr-10"
                        disabled={!isEditable("OVER_DRAFT")}
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
                            helperText: (
                              <>{errors?.odFacilityExpDate?.message}</>
                            ),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>

              {/* Rate of Interest - Rate & Rate of Interest - Standard Rate */}
              <div className="flex flex-row gap-9">
                {/* Rate of Interest - Rate	controller */}
                <Controller
                  name="odRateOfInterest"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("OVER_DRAFT")}
                      label="Rate of Interest - Rate"
                      size="small"
                      type="text"
                      helperText={<>{errors.odRateOfInterest?.message}</>}
                      error={!!errors.odRateOfInterest}
                    />
                  )}
                />

                {/* Rate of Interest - Standard Rate	controller */}
                <Controller
                  name="odRateOfInterestStandard"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("OVER_DRAFT")}
                      label="Rate of Interest - Standard Rate"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.odRateOfInterestStandard?.message}</>
                      }
                      error={!!errors.odRateOfInterestStandard}
                    />
                  )}
                />
              </div>

              {/* facility amount figures and words */}
              <div className="flex flex-row gap-9">
                {/* amount in figures */}
                <Controller
                  name="odFacilityAmountInFigures"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("OVER_DRAFT")}
                      label="Facility Amount Required (In figures)"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.odFacilityAmountInFigures?.message}</>
                      }
                      error={!!errors.odFacilityAmountInFigures}
                    />
                  )}
                />

                {/* amount in words */}
                <Controller
                  name="odFacilityAmountInWords"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("OVER_DRAFT")}
                      label="Facility Amount Required (in words)"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.odFacilityAmountInWords?.message}</>
                      }
                      error={!!errors.odFacilityAmountInWords}
                    />
                  )}
                />
              </div>

              {/* purpose */}
              <div className="w-1/2 pr-4">
                {/* purpose controller */}
                <Controller
                  name="odPurposeOfFacility"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("OVER_DRAFT")}
                      label="Purpose of the facility"
                      size="small"
                      type="text"
                      helperText={<>{errors.odPurposeOfFacility?.message}</>}
                      error={!!errors.odPurposeOfFacility}
                    />
                  )}
                />
              </div>
            </div>
          </Paper>
        </div>

        {/* bottom right */}
        <div>
          <Paper className="px-12 pb-10 h-full">
            <Ve3FormHeader
              icon="heroicons-outline:cash"
              title="Term Loan Facility"
            />

            <div className="flex flex-col gap-9">
              {/* facility acc and currency */}
              <div className="flex flex-row gap-9">
                {/* facility account controller */}
                <Controller
                  name="tlFacilityAccount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("TERM_LOAN")}
                      label="Facility Account"
                      size="small"
                      type="text"
                      helperText={<>{errors.tlFacilityAccount?.message}</>}
                      error={!!errors.tlFacilityAccount}
                    />
                  )}
                />
                {/* currency controller */}
                <Controller
                  name="tlCurrency"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={currencyDropdowns}
                      disabled={!isEditable("TERM_LOAN")}
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
                          label="Currency"
                          variant="outlined"
                          // required
                          size="small"
                          helperText={<>{errors.tlCurrency?.message}</>}
                          error={!!errors.tlCurrency}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* rate of interest & repayment period */}
              <div className="flex flex-row gap-9">
                {/* Rate of Interest controller */}
                <Controller
                  name="tlRateOfInterest"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("TERM_LOAN")}
                      label="Rate of Interest - Rate"
                      size="small"
                      type="text"
                      helperText={<>{errors.tlRateOfInterest?.message}</>}
                      error={!!errors.tlRateOfInterest}
                    />
                  )}
                />

                {/* repay period controller */}
                <Controller
                  name="tlRepaymentPeriod"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={repaymentTypeDropdowns}
                      disabled={!isEditable("TERM_LOAN")}
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
                          label="Repayment Period"
                          variant="outlined"
                          // required
                          size="small"
                          helperText={<>{errors.tlRepaymentPeriod?.message}</>}
                          error={!!errors.tlRepaymentPeriod}
                        />
                      )}
                    />
                  )}
                />
              </div>
              {tlRepaymentPeriod?.id == "OTHER" && (
                <div>
                  <Controller
                    name="tlFacilityRepayPeriodOther"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className=""
                        disabled={!isEditable("TERM_LOAN")}
                        label="Other (Specify in months)"
                        size="small"
                        type="text"
                        helperText={
                          <>{errors.tlFacilityRepayPeriodOther?.message}</>
                        }
                        error={!!errors.tlFacilityRepayPeriodOther}
                      />
                    )}
                  />
                </div>
              )}

              {/* repay account & repay currency */}
              <div className="flex flex-row gap-9">
                {/* repay account controller */}
                <Controller
                  name="tlRepaymentAccount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("TERM_LOAN")}
                      label="Repayment Account"
                      size="small"
                      type="text"
                      helperText={<>{errors.tlRepaymentAccount?.message}</>}
                      error={!!errors.tlRepaymentAccount}
                    />
                  )}
                />

                {/* repay currency controller */}
                <Controller
                  name="tlRepaymentCurrency"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={currencyDropdowns}
                      disabled={!isEditable("TERM_LOAN")}
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
                          label="Repayment Currency"
                          variant="outlined"
                          // required
                          size="small"
                          helperText={
                            <>{errors.tlRepaymentCurrency?.message}</>
                          }
                          error={!!errors.tlRepaymentCurrency}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* facility amount figures and words */}
              <div className="flex flex-row gap-9">
                {/* amount in figures */}
                <Controller
                  name="tlFacilityAmountInFigures"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("TERM_LOAN")}
                      label="Facility Amount Required (In figures)"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.tlFacilityAmountInFigures?.message}</>
                      }
                      error={!!errors.tlFacilityAmountInFigures}
                    />
                  )}
                />

                {/* amount in words */}
                <Controller
                  name="tlFacilityAmountInWords"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("TERM_LOAN")}
                      label="Facility Amount Required (in words)"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.tlFacilityAmountInWords?.message}</>
                      }
                      error={!!errors.tlFacilityAmountInWords}
                    />
                  )}
                />
              </div>

              {/* facility exp data & cred account */}
              <div className="flex flex-row gap-9">
                {/* date Controller */}
                <Controller
                  name="tlFacilityExpDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // className="basis-1/2 pr-10"
                        disabled={!isEditable("TERM_LOAN")}
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
                            error: !!errors.tlFacilityExpDate,
                            helperText: (
                              <>{errors?.tlFacilityExpDate?.message}</>
                            ),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />

                {/* facility cred account */}
                <Controller
                  name="tlFacilityCreditingAccount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("TERM_LOAN")}
                      label="Facility Crediting account"
                      size="small"
                      type="text"
                      helperText={
                        <>{errors.tlFacilityCreditingAccount?.message}</>
                      }
                      error={!!errors.tlFacilityCreditingAccount}
                    />
                  )}
                />
              </div>

              <div className="flex flex-row gap-9">
                {/* currency controller */}

                <Controller
                  name="tlCurrency2"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={currencyDropdowns}
                      disabled={!isEditable("TERM_LOAN")}
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
                          label="Crediting Currency"
                          variant="outlined"
                          // required
                          size="small"
                          helperText={<>{errors.tlCurrency2?.message}</>}
                          error={!!errors.tlCurrency2}
                        />
                      )}
                    />
                  )}
                />

                {/* purpose controller */}
                <Controller
                  name="tlPurposeOfFacility"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      disabled={!isEditable("TERM_LOAN")}
                      label="Purpose of the facility"
                      size="small"
                      type="text"
                      helperText={<>{errors.tlPurposeOfFacility?.message}</>}
                      error={!!errors.tlPurposeOfFacility}
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
          <Button type="submit" className="flex flex-row gap-3">
            <EdgeSvgIcon>feather:refresh-ccw</EdgeSvgIcon>
            Update
          </Button>
        </div>
      )}
    </div>
  );
};

export default FacilityAndCollateralInformation;
