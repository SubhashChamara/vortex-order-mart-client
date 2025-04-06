import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../core/types/DropDown";
import { formatCurrency } from "../../../bundle/@helpers/Common";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

interface NewCollateralDetailsViewProps {
  editable: boolean;
  currencyDropdowns: DropDownItem[];
}

const NewCollateralDetailsView: React.FC<NewCollateralDetailsViewProps> = ({
  editable,
  currencyDropdowns,
}) => {
  const { control, formState, setValue } = useFormContext();
  const { errors } = formState;

  console.log(errors);

  useEffect(() => {
    setValue("currentStep", 3);
  }, []);

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="material-outline:gavel"
          title="New Collateral Details View"
        />
        <div className="flex flex-col gap-9">
          <div className="flex flex-row gap-9">
            {/* purpose controller */}
            <Controller
              name="lienAccountNum"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className=""
                  required
                  disabled={!editable}
                  label="Lien Account Number"
                  size="small"
                  type="text"
                  helperText={<>{errors.lienAccountNum?.message}</>}
                  error={!!errors.lienAccountNum}
                />
              )}
            />

            <Controller
              name="ncCurrency"
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
                      label="Currency"
                      variant="outlined"
                      required
                      size="small"
                      helperText={<>{errors.ncCurrency?.message}</>}
                      error={!!errors.ncCurrency}
                    />
                  )}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9">
            {/* purpose controller */}
            <Controller
              name="ncName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className=""
                  disabled={!editable}
                  label="Name"
                  size="small"
                  type="text"
                  helperText={<>{errors.ncName?.message}</>}
                  error={!!errors.ncName}
                />
              )}
            />

            {/* currency controller */}
            <Controller
              name="ncInterest"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className=""
                  disabled={!editable}
                  label="Interest %"
                  size="small"
                  type="text"
                  helperText={<>{errors.ncInterest?.message}</>}
                  error={!!errors.ncInterest}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9">
            {/* date Controller */}
            <Controller
              name="ncMaturityDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // className="basis-1/2 pr-10"
                    disabled={!editable}
                    minDate={dayjs()}
                    views={["year", "month", "day"]}
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
                        error: !!errors.ncMaturityDate,
                        helperText: <>{errors?.ncMaturityDate?.message}</>,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />

            {/* currency controller */}
            <Controller
              name="ncCurrentBalance"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className=""
                  disabled={!editable}
                  label="Current Balance"
                  size="small"
                  type="text"
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
                  helperText={<>{errors.ncCurrentBalance?.message}</>}
                  error={!!errors.ncCurrentBalance}
                />
              )}
            />
          </div>

          <div className="flex flex-row gap-9">
            {/* purpose controller */}
            <Controller
              name="ncLienAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  className=""
                  disabled={!editable}
                  label="Lien Amount"
                  size="small"
                  type="text"
                  onChange={(e) =>
                    field.onChange(formatCurrency(e.target.value))
                  }
                  helperText={<>{errors.ncLienAmount?.message}</>}
                  error={!!errors.ncLienAmount}
                />
              )}
            />

            {/* currency controller */}
            <Controller
              name="ncApplicableLtv"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  className=""
                  disabled={!editable}
                  label="Applicable LTV %"
                  size="small"
                  type="text"
                  helperText={<>{errors.ncApplicableLtv?.message}</>}
                  error={!!errors.ncApplicableLtv}
                />
              )}
            />
          </div>

          {/* purpose controller */}
          <Controller
            name="ncApplicableAmountKeptAsCollateral"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                // className="w-1/2 pr-4"
                disabled={!editable}
                label="Applicable amount to be kept as collateral"
                size="small"
                type="text"
                helperText={
                  <>{errors.ncApplicableAmountKeptAsCollateral?.message}</>
                }
                error={!!errors.ncApplicableAmountKeptAsCollateral}
              />
            )}
          />
        </div>

        <div className="flex items-end justify-end mt-9">
          <Button
            type="submit"
            className="flex flex-row gap-3"
            disabled={!editable}
          >
            <EdgeSvgIcon>feather:plus</EdgeSvgIcon>
            Add or Update
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default NewCollateralDetailsView;
