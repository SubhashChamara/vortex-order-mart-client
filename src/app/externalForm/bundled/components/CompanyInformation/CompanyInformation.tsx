import { Autocomplete, Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";
import { formatCurrency } from "../../../../workflow/bundle/@helpers/Common";

interface CompanyInformationProps {
  editable: boolean;
  companyDropdowns?: DropDownItem[];
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({
  editable,
  companyDropdowns,
}) => {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <Paper className="px-12 pb-10 w-full">
      <Ve3FormHeader icon="feather:briefcase" title="Company Information" />
      <div className="w-full h-full flex flex-col gap-9">
        <div>
          {/* Company Controller */}
          <Controller
            name="companyName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={companyDropdowns || []}
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
        </div>

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
              inputProps={{
                maxLength: 10,
              }}
              onChange={(e) => {
                const value = e.target.value.slice(0, 10);
                field.onChange(value);
              }}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              helperText={<>{errors.companyTelephone?.message}</>}
              error={!!errors.companyTelephone}
            />
          )}
        />

        <Controller
          name="basicSalary"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Basic Salary"
              required
              disabled={!editable}
              size="small"
              type="text"
              helperText={<>{errors.basicSalary?.message}</>}
              error={!!errors.basicSalary}
              onChange={(e) => field.onChange(formatCurrency(e.target.value))}
              InputProps={{
                inputProps: { style: { textAlign: "right" } },
              }}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
            />
          )}
        />
      </div>
    </Paper>
  );
};

export default CompanyInformation;
